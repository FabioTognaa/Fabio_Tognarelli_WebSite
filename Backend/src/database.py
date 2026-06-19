from src.config import settings as s
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from sqlalchemy import pool
from typing import AsyncGenerator

# stringa url di collegamento al database
DATABASE_URL = f"postgresql+asyncpg://{s.db_user}:{s.db_pass.get_secret_value()}@{s.db_host}:{s.db_port}/{s.db_name}"

# classe base per le model: 
class Base(DeclarativeBase):
    pass

# engine e creazione della sessione
engine = create_async_engine(DATABASE_URL, poolclass=pool.NullPool,connect_args={"ssl": "require"})
async_session_maker = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

# funzione per ottenere una sessione
async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session