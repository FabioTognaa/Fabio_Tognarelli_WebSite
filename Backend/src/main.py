from fastapi import FastAPI
from src.config import settings

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
