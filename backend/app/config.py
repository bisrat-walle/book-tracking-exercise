import os
from dotenv import load_dotenv
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = Field(..., env='DATABASE_URL')


settings = Settings()
