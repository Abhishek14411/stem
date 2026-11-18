import asyncio
import json

import pytest
from fastapi.testclient import TestClient
from pydantic import ValidationError

from app.api.tutor_schemas import BiologyTutorRequest, TutorAnswer
from app.main import app
from app.services.biology_catalogue import BIOLOGY_LESSONS
from app.services.tutor import GeminiTutorProvider, TutorService
from app.settings import Settings


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


def settings(enabled=True, key="fake"):
    return Settings(enabled, key, "test-model", 1, 200, 12)


def payload(module_id="bio-cell", grade=8, language="en", **extra):
    return {
        "language": language,
        "subject": "biology",
        "grade": grade,
        "module_id": module_id,
        "student_message": "What does this part do?",
        "experiment_context": {"cell": "Plant cell"},
        **extra,
    }


def test_biology_catalogue_covers_all_seventeen_modules_with_bilingual_fallbacks():
    assert len(BIOLOGY_LESSONS) == 17
    assert {lesson["grade"] for lesson in BIOLOGY_LESSONS.values()} == {6, 7, 8}
    for lesson in BIOLOGY_LESSONS.values():
        assert lesson["facts"] and lesson["safety"]
        assert all(len(lesson[key]) == 3 for key in ("fallback", "fallback_hi"))


@pytest.mark.parametrize(("module_id", "grade"), [
    ("bio-plant-world", 6), ("bio-diversity", 6), ("bio-plant-exploring", 6),
    ("bio-movement", 6), ("bio-classification", 6), ("bio-characteristics", 6),
    ("bio-photosynthesis", 7), ("bio-digestion", 7), ("bio-respiration", 7),
    ("bio-transport", 7), ("bio-plant-repro", 7), ("bio-forest", 7),
    ("bio-cell", 8), ("bio-microbes", 8), ("bio-animal-reproduction", 8),
    ("bio-adolescence", 8), ("bio-conservation", 8),
])
def test_biology_endpoint_returns_lesson_specific_fallback(module_id, grade):
    with TestClient(app) as client:
        app.state.tutor_service = TutorService(settings(enabled=False), None)
        response = client.post("/api/v1/tutor/biology/respond", json=payload(module_id, grade))
    assert response.status_code == 200
    result = response.json()
    assert result["status"] == "fallback"
    assert result["message"] == BIOLOGY_LESSONS[module_id]["fallback"][0]
    assert result["hint"] and result["follow_up_question"]


def test_biology_endpoint_returns_hindi_and_safety_fallbacks():
    with TestClient(app) as client:
        app.state.tutor_service = TutorService(settings(enabled=False), None)
        hindi = client.post("/api/v1/tutor/biology/respond", json=payload("bio-cell", 8, "hi"))
        safety = client.post(
            "/api/v1/tutor/biology/respond",
            json=payload("bio-microbes", 8, student_message="Can I grow bacteria at home?"),
        )
    assert hindi.status_code == safety.status_code == 200
    assert "\u0915\u094b\u0936\u093f\u0915\u093e\u090f\u0901" in hindi.json()["message"]
    assert safety.json()["status"] == "fallback"
    assert "Do not touch" in safety.json()["message"]
    assert safety.json()["hint"] is None


def test_biology_request_rejects_unknown_modules_mismatched_grade_and_unbounded_context():
    invalid = (
        payload("unknown", 6),
        payload("bio-plant-world", 7),
        payload("bio-cell", 8, subject="physics"),
        payload("bio-cell", 8, experiment_context={"nested": {"value": True}}),
        payload("bio-cell", 8, experiment_context={f"v{i}": i for i in range(13)}),
        payload("bio-cell", 8, experiment_context={"value": "x" * 97}),
        payload("bio-cell", 8, student_message="x" * 801),
    )
    for value in invalid:
        with pytest.raises(ValidationError):
            BiologyTutorRequest.model_validate(value)


def test_biology_provider_receives_curated_lesson_and_bounded_context():
    class Models:
        async def generate_content(self, **kwargs):
            self.args = kwargs
            return type("Result", (), {"text": '{"message":"The nucleus contains genetic material.","hint":"Find its label.","follow_up_question":"What other structures do you see?","misconception_tag":null}'})()

    class Aio:
        def __init__(self):
            self.models = Models()

    class Client:
        def __init__(self):
            self.aio = Aio()

    client = Client()
    provider = GeminiTutorProvider(client, "test-model", 1, 200)
    request = BiologyTutorRequest.model_validate(payload())
    answer = asyncio.run(provider.respond(request))
    sent = json.loads(client.aio.models.args["contents"])
    assert isinstance(answer, TutorAnswer)
    assert sent["subject"] == "biology" and sent["module_id"] == "bio-cell"
    assert sent["curated_lesson"]["facts"] == BIOLOGY_LESSONS["bio-cell"]["facts"]
    assert sent["experiment_context"] == {"cell": "Plant cell"}


def test_biology_provider_failure_returns_fallback_without_logging_student_data(caplog):
    with TestClient(app) as client:
        app.state.tutor_service = TutorService(
            settings(), FakeProvider(error=RuntimeError("SECRET student information"))
        )
        response = client.post("/api/v1/tutor/biology/respond", json=payload())
    assert response.status_code == 200
    assert response.json()["status"] == "fallback"
    assert "SECRET student information" not in caplog.text


def test_vite_preview_origin_can_call_the_biology_tutor_route():
    with TestClient(app) as client:
        response = client.options(
            "/api/v1/tutor/biology/respond",
            headers={
                "Origin": "http://127.0.0.1:4173",
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "content-type",
            },
        )
    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == "http://127.0.0.1:4173"
