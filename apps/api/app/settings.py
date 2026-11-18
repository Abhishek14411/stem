import os
from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    spark_ai_enabled: bool
    gemini_api_key: str
    gemini_model: str
    timeout_seconds: float
    max_output_tokens: int
    requests_per_minute: int

    @classmethod
    def from_env(cls) -> "Settings":
        return cls(
            spark_ai_enabled=os.getenv("SPARK_AI_ENABLED", "false").lower() == "true",
            gemini_api_key=os.getenv("GEMINI_API_KEY", "").strip(),
            gemini_model=os.getenv("GEMINI_MODEL", "gemini-3.8-flash").strip(),
            timeout_seconds=min(90.0, max(1.0, float(os.getenv("SPARK_TIMEOUT_SECONDS", "90")))),
            max_output_tokens=min(512, max(64, int(os.getenv("SPARK_MAX_OUTPUT_TOKENS", "220")))),
            requests_per_minute=min(60, max(1, int(os.getenv("SPARK_REQUESTS_PER_MINUTE", "12")))),
        )
