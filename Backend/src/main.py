from fastapi import FastAPI, Depends
from src.config import settings
from src.shemas import Contact
from src.database import get_async_session
from sqlalchemy.ext.asyncio import AsyncSession
from src.contacts.models import Contacts

app = FastAPI( title= settings.app_name)
# endpoint hello world
@app.get("/")
async def hello():
    print(__name__)
    return{"saluto": "suca"}

# endpoint con variabile
@app.get("/suca/{nome}")
async def persona(nome):
    print(__name__)
    return{"suca": nome}
    
# endpoint per inviare informazioni di contatto al db
@app.post("/contact")
async def insert_contact(contact: Contact, session: AsyncSession = Depends(get_async_session)):
    contact = Contacts(name=contact.name, email=contact.email, message=contact.message) # creo un'istanza di riga della tabella contacts
    try:
        session.add(contact)        # aggiungo il contatto alla sessione
        await session.commit()
        return{"message": "Contatto inviato con successo"}
    except Exception as e:
        return{"message": "Errore durante l'invio del contatto", "error": str(e)}

    