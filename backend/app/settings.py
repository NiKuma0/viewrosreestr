from pydantic import BaseSettings


class Settings(BaseSettings):
    origins: list[str] = ["http://localhost:8000", "http://localhost:3000"]
