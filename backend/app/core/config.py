from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    ENVIRONMENT: str = "development"

    # Database
    DATABASE_URL: str = "postgresql+psycopg2://pdftoolbox:12345678@localhost:5432/pdftoolbox"

    # Redis / Celery
    REDIS_URL: str = "redis://localhost:6379/0"
    CELERY_BROKER_URL: str = "redis://localhost:6379/0"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/1"

    # Auth
    JWT_SECRET_KEY: str = "change_me_to_a_long_random_string"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # Storage
    STORAGE_BACKEND: str = "local"
    STORAGE_PATH: str = "./storage"

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000"]

    # Uploads
    MAX_UPLOAD_SIZE_MB: int = 100

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
