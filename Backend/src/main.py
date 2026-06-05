from fastapi import FastAPI
from src.Blog.routers import router as blog_router
from src.config import settings

app = FastAPI( title= settings.app_name)
app.include_router(blog_router)     # importo endpoint del file routers.py

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

# gestione tramite query
