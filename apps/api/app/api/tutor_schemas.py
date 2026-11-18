import math
import re
from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, Field, StringConstraints, field_validator

from app.services.biology_catalogue import BIOLOGY_MODULE_GRADES

Language = Literal["en", "hi"]
Misconception = Literal["missing_power_source", "open_path", "missing_component", "switch_state", "complete_circuit", "out_of_scope"]

class CircuitContext(BaseModel):
    model_config = ConfigDict(extra="forbid")
    battery_present: bool
    bulb_count: int = Field(ge=0, le=2)
    wire_gaps: int = Field(ge=0, le=4)
    switch_present: bool
    switch_open: bool | None
    evaluator_powered: bool
    missing_slots: list[Literal["battery", "bulb", "wire", "switch"]] = Field(default_factory=list, max_length=4)

    @field_validator("switch_open")
    @classmethod
    def switch_state_consistent(cls, value, info):
        present = info.data.get("switch_present")
        if present is False and value is not None:
            raise ValueError("switch_open must be null when no switch exists")
        if present is True and value is None:
            raise ValueError("switch_open is required when a switch exists")
        return value

    @field_validator("evaluator_powered")
    @classmethod
    def evaluator_matches_context(cls, value, info):
        data = info.data
        expected = bool(data.get("battery_present") and data.get("bulb_count", 0) > 0 and data.get("wire_gaps", 4) == 0 and data.get("switch_open") is not True)
        if value != expected:
            raise ValueError("evaluator result does not match bounded circuit context")
        return value

class TutorRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    language: Language
    grade_band: Literal["6-8"]
    lesson_id: Literal["electricity-circuits"]
    challenge_number: int = Field(ge=1, le=3)
    student_message: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=800)]
    circuit_context: CircuitContext

class TutorAnswer(BaseModel):
    model_config = ConfigDict(extra="forbid")
    message: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=500)]
    hint: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=240)] | None
    follow_up_question: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=240)] | None
    misconception_tag: Misconception | None

class TutorResponse(TutorAnswer):
    status: Literal["ok", "fallback"]


PhysicsModuleId = Literal[
    "motion-distance", "light-shadow", "electric-circuits", "magnets",
    "heat", "motion-time", "current-effects", "light",
    "electric-effects", "forces", "pressure-weather", "sound",
    "reflection-eye", "natural-phenomena",
]


class PhysicsTutorRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    language: Language
    subject: Literal["physics"]
    grade: Literal[6, 7, 8]
    module_id: PhysicsModuleId
    student_message: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=800)]
    experiment_context: dict[str, str | int | float | bool] = Field(default_factory=dict)

    @field_validator("experiment_context", mode="before")
    @classmethod
    def bounded_experiment_context(cls, value):
        if not isinstance(value, dict) or len(value) > 12:
            raise ValueError("experiment_context must be an object with at most 12 values")
        for key, item in value.items():
            if not isinstance(key, str) or not re.fullmatch(r"[A-Za-z][A-Za-z0-9_-]{0,31}", key):
                raise ValueError("invalid experiment context key")
            if isinstance(item, str):
                if len(item) > 96:
                    raise ValueError("experiment context string is too long")
            elif isinstance(item, bool):
                continue
            elif isinstance(item, (int, float)):
                if not math.isfinite(item) or abs(item) > 1_000_000_000:
                    raise ValueError("experiment context number is out of range")
            else:
                raise ValueError("experiment context values must be scalar")  # noqa: TRY004
        return value

    @field_validator("module_id")
    @classmethod
    def module_matches_grade(cls, value, info):
        module_grades = {
            "motion-distance": 6, "light-shadow": 6, "electric-circuits": 6, "magnets": 6,
            "heat": 7, "motion-time": 7, "current-effects": 7, "light": 7,
            "electric-effects": 8, "forces": 8, "pressure-weather": 8, "sound": 8,
            "reflection-eye": 8, "natural-phenomena": 8,
        }
        grade = info.data.get("grade")
        if grade is not None and module_grades[value] != grade:
            raise ValueError("module_id does not belong to the requested grade")
        return value


BiologyModuleId = Literal[
    "bio-plant-world", "bio-diversity", "bio-plant-exploring", "bio-movement",
    "bio-classification", "bio-characteristics", "bio-photosynthesis", "bio-digestion",
    "bio-respiration", "bio-transport", "bio-plant-repro", "bio-forest", "bio-cell",
    "bio-microbes", "bio-animal-reproduction", "bio-adolescence", "bio-conservation",
]


class BiologyTutorRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    language: Language
    subject: Literal["biology"]
    grade: Literal[6, 7, 8]
    module_id: BiologyModuleId
    student_message: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=800)]
    experiment_context: dict[str, str | int | float | bool] = Field(default_factory=dict)

    @field_validator("experiment_context", mode="before")
    @classmethod
    def bounded_experiment_context(cls, value):
        if not isinstance(value, dict) or len(value) > 12:
            raise ValueError("experiment_context must be an object with at most 12 values")
        for key, item in value.items():
            if not isinstance(key, str) or not re.fullmatch(r"[A-Za-z][A-Za-z0-9_-]{0,31}", key):
                raise ValueError("invalid experiment context key")
            if isinstance(item, str):
                if len(item) > 96:
                    raise ValueError("experiment context string is too long")
            elif isinstance(item, bool):
                continue
            elif isinstance(item, (int, float)):
                if not math.isfinite(item) or abs(item) > 1_000_000_000:
                    raise ValueError("experiment context number is out of range")
            else:
                raise ValueError("experiment context values must be scalar")  # noqa: TRY004
        return value

    @field_validator("module_id")
    @classmethod
    def module_matches_grade(cls, value, info):
        grade = info.data.get("grade")
        if grade is not None and BIOLOGY_MODULE_GRADES[value] != grade:
            raise ValueError("module_id does not belong to the requested grade")
        return value
