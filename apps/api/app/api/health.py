from fastapi import APIRouter, Request

router = APIRouter()


@router.get("/health", tags=["health"])
async def health_check() -> dict[str, str]:
    """Return a simple health response for local environment verification."""
    return {"status": "ok", "service": "smartclass-api"}


@router.get("/tutor/status", tags=["tutor"])
async def tutor_status(request: Request) -> dict[str, bool]:
    service = request.app.state.tutor_service
    return {"configured": bool(service.settings.spark_ai_enabled and service.settings.gemini_api_key and service.provider)}
