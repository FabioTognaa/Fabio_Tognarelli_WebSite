from src.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, Text 
# QUI CI SONO I MODELLI DELLE TABELLE CHE HAI NEL DATABASE
class Contacts(Base):
    # campi contatti
    __tablename__ = "contacts"    # nome della tabella
    # colonna id che funge da primary_key
    id:Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)   
    # altri campi in formato testo
    name:Mapped[str] = mapped_column(Text)
    email:Mapped[str] = mapped_column(Text)
    message:Mapped[str] = mapped_column(Text)