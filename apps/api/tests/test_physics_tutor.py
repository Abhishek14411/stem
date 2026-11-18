import pytest
from fastapi.testclient import TestClient
from pydantic import ValidationError

from app.api.tutor_schemas import PhysicsTutorRequest, TutorAnswer
from app.main import app
from app.services.physics_catalogue import PHYSICS_LESSONS
from app.services.tutor import GeminiTutorProvider, TutorService
from app.settings import Settings


def settings(enabled=True, key="fake"):
    return Settings(enabled, key, "test-model", 1, 200, 12)


def payload(module_id="heat", grade=7, language="en", **extra):
    return {
        "language": language, "subject": "physics", "grade": grade,
        "module_id": module_id, "student_message": "Why does the spoon warm up?",
        "experiment_context": {"temperature": 60, "transfer": "Conduction"}, **extra,
    }


class FakeProvider:
    def __init__(self, answer=None, error=None):
        self.answer, self.error, self.requests = answer, error, []

    async def respond(self, request):
        self.requests.append(request)
        if self.error:
            raise self.error
        return self.answer

    async def close(self):
        pass


def test_physics_catalogue_covers_all_fourteen_supplied_modules():
    assert len(PHYSICS_LESSONS) == 14
    assert {lesson["grade"] for lesson in PHYSICS_LESSONS.values()} == {6, 7, 8}
    for lesson in PHYSICS_LESSONS.values():
        assert lesson["objectives"] and lesson["concepts"] and lesson["facts"]
        assert lesson["misconceptions"] and lesson["safety"]
        assert all(lesson[key] for key in ("fallback", "fallback_hi"))


@pytest.mark.parametrize(("module_id", "grade"), [
    ("motion-distance", 6), ("light-shadow", 6), ("electric-circuits", 6), ("magnets", 6),
    ("heat", 7), ("motion-time", 7), ("current-effects", 7), ("light", 7),
    ("electric-effects", 8), ("forces", 8), ("pressure-weather", 8), ("sound", 8),
    ("reflection-eye", 8), ("natural-phenomena", 8),
])
def test_physics_endpoint_returns_module_specific_scripted_fallback(module_id, grade):
    with TestClient(app) as client:
        app.state.tutor_service = TutorService(settings(enabled=False), None)
        response = client.post("/api/v1/tutor/physics/respond", json=payload(module_id, grade))
    assert response.status_code == 200
    result = response.json()
    assert result["status"] == "fallback"
    assert result["message"] == PHYSICS_LESSONS[module_id]["fallback"][0]
    assert result["hint"] and result["follow_up_question"]


def test_physics_endpoint_returns_hindi_scripted_help_and_safety_fallback():
    with TestClient(app) as client:
        app.state.tutor_service = TutorService(settings(enabled=False), None)
        hindi = client.post("/api/v1/tutor/physics/respond", json=payload("sound", 8, "hi"))
        hazard_payload = payload("heat", 7, student_message="I touched a fire wire")
        hazard = client.post("/api/v1/tutor/physics/respond", json=hazard_payload)
    assert hindi.status_code == hazard.status_code == 200
    assert "\u0927\u094d\u0935\u0928\u093f" in hindi.json()["message"]
    assert "Move away" in hazard.json()["message"]
    assert hazard.json()["hint"] is None


def test_physics_request_rejects_unknown_or_mismatched_lesson_and_bad_context():
    for value in (
        payload("not-a-module", 7), payload("heat", 6), payload("heat", 7, subject="chemistry"),
        payload("heat", 7, experiment_context={"nested": {"unsafe": True}}),
        payload("heat", 7, experiment_context={f"v{i}": i for i in range(13)}),
        payload("heat", 7, experiment_context={"reading": "x" * 97}),
        payload("heat", 7, student_message="x" * 801),
    ):
        with pytest.raises(ValidationError):
            PhysicsTutorRequest.model_validate(value)


def test_physics_provider_failure_uses_scripted_fallback_without_exposing_error(caplog):
    with TestClient(app) as client:
        app.state.tutor_service = TutorService(settings(), FakeProvider(error=RuntimeError("secret student detail")))
        response = client.post("/api/v1/tutor/physics/respond", json=payload("magnets", 6))
    assert response.status_code == 200
    assert response.json()["status"] == "fallback"
    assert "secret student detail" not in caplog.text


def test_gemini_provider_sends_curated_physics_context_and_json_schema():
    class Models:
        async def generate_content(self, **kwargs):
            self.args = kwargs
            return type("Result", (), {"text": '{"message":"Heat moves through the spoon by conduction.","hint":"Compare the model settings.","follow_up_question":"What is touching the spoon?","misconception_tag":null}'})()

    class Aio:
        def __init__(self):
            self.models = Models()

    class Client:
        def __init__(self):
            self.aio = Aio()

    import asyncio
    import json

    client = Client()
    provider = GeminiTutorProvider(client, "test-model", 1, 200)
    request = PhysicsTutorRequest.model_validate(payload())
    answer = asyncio.run(provider.respond(request))
    args = client.aio.models.args
    sent = json.loads(args["contents"])
    assert isinstance(answer, TutorAnswer)
    assert sent["module_id"] == "heat" and sent["grade"] == 7
    assert sent["curated_lesson"]["facts"] == PHYSICS_LESSONS["heat"]["facts"]
    assert args["config"].response_json_schema == TutorAnswer.model_json_schema()
    assert args["config"].response_schema is None
