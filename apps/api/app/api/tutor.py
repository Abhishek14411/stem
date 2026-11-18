from fastapi import APIRouter, Request

from app.api.tutor_schemas import (
    BiologyTutorRequest,
    PhysicsTutorRequest,
    TutorRequest,
    TutorResponse,
)
from app.services.tutor import TutorService

router = APIRouter(tags=["tutor"])

@router.post("/tutor/respond", response_model=TutorResponse)
async def respond(payload: TutorRequest, request: Request) -> TutorResponse:
    service: TutorService = request.app.state.tutor_service
    return await service.answer(payload)


@router.post("/tutor/physics/respond", response_model=TutorResponse)
async def respond_physics(payload: PhysicsTutorRequest, request: Request) -> TutorResponse:
    service: TutorService = request.app.state.tutor_service
    return await service.answer_physics(payload)


@router.post("/tutor/biology/respond", response_model=TutorResponse)
async def respond_biology(payload: BiologyTutorRequest, request: Request) -> TutorResponse:
    service: TutorService = request.app.state.tutor_service
    return await service.answer_biology(payload)
