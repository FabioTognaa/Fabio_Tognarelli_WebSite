from src.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, Text 
# modello della tabella EVENTO
class Evento(Base):
    # campi evento
    __tablename__ = "events"    # nome della tabella
    # colonna id che funge da primary_key
    id:Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)   
    # altri campi in formato testo
    nome:Mapped[str] = mapped_column(Text)
    email:Mapped[str] = mapped_column(Text)