import pytest
from fastapi.testclient import TestClient

from app.api.tutor_schemas import TutorAnswer, TutorRequest
from app.main import app
from app.services.tutor import GeminiTutorProvider, TutorService, validate_output
from app.settings import Settings
from app.settings import Settings as AppSettings


class FakeProvider:
    def __init__(self, answer=None, error=None): self.answer, self.error = answer, error
    async def respond(self, request):
        if self.error: raise self.error
        return self.answer
    async def close(self): pass

def settings(enabled=True, key="fake"):
    return Settings(enabled, key, "test-model", 1, 200, 12)

def test_timeout_setting_defaults_to_90_and_allows_90(monkeypatch):
    monkeypatch.delenv("SPARK_TIMEOUT_SECONDS", raising=False)
    assert AppSettings.from_env().timeout_seconds == 90
    monkeypatch.setenv("SPARK_TIMEOUT_SECONDS", "90")
    assert AppSettings.from_env().timeout_seconds == 90

def test_provider_failure_logs_only_safe_category(caplog):
    with TestClient(app) as client:
        app.state.tutor_service = TutorService(settings(), FakeProvider(error=RuntimeError("SECRET student data")))
        response = client.post("/api/v1/tutor/respond", json=payload())
    assert response.json()["status"] == "fallback"
    assert "exception_class=RuntimeError" in caplog.text
    assert "category=provider_error" in caplog.text
    assert "SECRET" not in caplog.text and "student data" not in caplog.text

def test_gemini_uses_standard_json_schema_config():
    class Models:
        async def generate_content(self, **kwargs):
            self.config = kwargs["config"]
            return type("Result", (), {"text": '{"message":"A gap breaks the path.","hint":"Find it.","follow_up_question":"Where is it?","misconception_tag":"open_path"}'})()

    class Aio:
        def __init__(self): self.models = Models()

    class Client:
        def __init__(self): self.aio = Aio()

    async def verify_config():
        provider_client = Client()
        provider = GeminiTutorProvider(provider_client, "configurable-model", 1, 200)
        from app.api.tutor_schemas import TutorRequest
        await provider.respond(TutorRequest.model_validate(payload()))
        config = provider_client.aio.models.config
        assert config.response_json_schema == TutorAnswer.model_json_schema()
        assert config.response_schema is None
        assert config.response_mime_type == "application/json"

    import asyncio
    asyncio.run(verify_config())

def payload(**changes):
    value = {"language":"en", "grade_band":"6-8", "lesson_id":"electricity-circuits", "challenge_number":1,
             "student_message":"Why is my bulb off?", "circuit_context":{"battery_present":True,"bulb_count":1,"wire_gaps":1,
             "switch_present":False,"switch_open":None,"evaluator_powered":False}}
    value.update(changes)
    return value

def test_missing_key_uses_localized_fallback():
    with TestClient(app) as client:
        app.state.tutor_service = TutorService(settings(key=""), None)
        result = client.post("/api/v1/tutor/respond", json=payload()).json()
        assert result["status"] == "fallback" and "path" in result["message"]

def test_valid_english_and_hindi_fake_provider():
    answer = TutorAnswer(message="A gap breaks the path.", hint="Find the gap.", follow_up_question="Where is it?", misconception_tag="open_path")
    with TestClient(app) as client:
        app.state.tutor_service = TutorService(settings(), FakeProvider(answer))
        english_response = client.post("/api/v1/tutor/respond", json=payload()).json()
        assert english_response["status"] == "ok"
        hi = payload(language="hi")
        hindi = TutorAnswer(
            message="रास्ता टूट गया है, इसलिए धारा नहीं बह सकती।",
            hint="खाली जगह देखें।",
            follow_up_question="रास्ता कहाँ रुका है?",
            misconception_tag="open_path",
        )
        app.state.tutor_service = TutorService(settings(), FakeProvider(hindi))
        hindi_response = client.post("/api/v1/tutor/respond", json=hi).json()
        assert hindi_response["status"] == "ok"
        assert hindi_response["message"] == hindi.message
        assert hindi_response["message"] != "रास्ता टूटा है, इसलिए धारा नहीं बह सकती। खाली जगह या खुले स्विच को देखें।"

def test_invalid_requests_rejected():
    with TestClient(app) as client:
        for changes in ({"language":"fr"}, {"lesson_id":"other"}, {"challenge_number":4},
                        {"student_message":"x"*801}, {"circuit_context":{"battery_present":True,"bulb_count":3,"wire_gaps":0,"switch_present":False,"switch_open":None,"evaluator_powered":False}}):
            value=payload(); value.update(changes)
            assert client.post("/api/v1/tutor/respond", json=value).status_code == 422

def test_provider_failures_are_safe_fallback():
    with TestClient(app) as client:
        app.state.tutor_service = TutorService(settings(), FakeProvider(error=RuntimeError("SECRET provider trace")))
        response=client.post("/api/v1/tutor/respond", json=payload())
        assert response.status_code == 200 and response.json()["status"] == "fallback"
        assert "SECRET" not in response.text


def test_disabled_ai_uses_fallback():
    with TestClient(app) as client:
        app.state.tutor_service = TutorService(settings(enabled=False), FakeProvider())
        result = client.post("/api/v1/tutor/respond", json=payload()).json()
        assert result["status"] == "fallback"


def test_provider_timeout_quota_safety_malformed_and_server_errors_fallback():
    failures = [TimeoutError("private timeout"), RuntimeError("429 quota safety block"),
                ValueError("malformed response"), RuntimeError("500 provider secret trace")]
    with TestClient(app) as client:
        for failure in failures:
            app.state.tutor_service = TutorService(settings(), FakeProvider(error=failure))
            response = client.post("/api/v1/tutor/respond", json=payload())
            assert response.status_code == 200
            assert response.json()["status"] == "fallback"
            assert "private" not in response.text and "secret" not in response.text


def test_contradictory_provider_output_is_replaced_by_fallback():
    contradiction = TutorAnswer(message="The bulb is glowing because the loop is complete.", hint=None,
                                follow_up_question=None, misconception_tag="complete_circuit")
    with TestClient(app) as client:
        app.state.tutor_service = TutorService(settings(), FakeProvider(contradiction))
        response = client.post("/api/v1/tutor/respond", json=payload())
        assert response.json()["status"] == "fallback"
        assert "glowing" not in response.json()["message"]


@pytest.mark.parametrize(
    ("language", "message", "is_valid"),
    [
        ("hi", "बल्ब नहीं जल रहा है", True),
        ("hi", "बल्ब जल रहा है", False),
        ("hi", "बल्ब नहीं चमक रहा है", True),
        ("en", "The bulb does not glow", True),
        ("en", "The bulb is glowing", False),
    ],
)
def test_circuit_glow_claim_validation_respects_negation(language, message, is_valid):
    request_data = payload(language=language)
    request = TutorRequest.model_validate(request_data)
    answer = TutorAnswer(message=message, hint=None, follow_up_question=None, misconception_tag=None)

    if is_valid:
        assert validate_output(answer, request) == answer
    else:
        with pytest.raises(ValueError, match="contradictory circuit assertion"):
            validate_output(answer, request)
