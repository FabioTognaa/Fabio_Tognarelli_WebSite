import os
from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict

# fondamentalmente questo file: valida i tipi delle variabili, legge dagli .env
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_FILE = os.path.join(BASE_DIR, ".env")


class Settings(BaseSettings):
    # legge il file env | tipi di var env
    model_config = SettingsConfigDict(env_file=ENV_FILE)
    app_name: str 
    database_url: str 

    # var del database
    db_name: str
    db_host: str
    db_port: int
    db_user: str
    db_pass: SecretStr

settings = Settings()