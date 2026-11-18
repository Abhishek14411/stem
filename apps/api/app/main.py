from contextlib import asynccontextmanager
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.health import router as health_router
from app.api.tutor import router as tutor_router
from app.services.tutor import GeminiTutorProvider, TutorService
from app.settings import Settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    load_dotenv(Path(__file__).resolve().parents[1] / ".env", override=False)
    settings = Settings.from_env()
    provider = None
    if settings.spark_ai_enabled and settings.gemini_api_key:
        from google import genai
        from google.genai import types
        provider = GeminiTutorProvider(genai.Client(api_key=settings.gemini_api_key,
                                                    http_options=types.HttpOptions(timeout=int(settings.timeout_seconds * 1000))), settings.gemini_model,
                                       settings.timeout_seconds, settings.max_output_tokens)
    app.state.tutor_service = TutorService(settings, provider)
    try:
        yield
    finally:
        if provider:
            await provider.close()

app = FastAPI(title="SmartClass Buddy API", description="API for personalized, accessible STEM learning.",
              version="0.1.0", lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=[
                       "http://127.0.0.1:5173", "http://localhost:5173",
                       "http://127.0.0.1:4173", "http://localhost:4173",
                   ],
                   allow_credentials=True, allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
                   allow_headers=["Authorization", "Content-Type", "Accept"])
app.include_router(health_router, prefix="/api/v1")
app.include_router(tutor_router, prefix="/api/v1")
