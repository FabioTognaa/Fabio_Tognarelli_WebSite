from pydantic import BaseModel, Field

class Post(BaseModel):
    id: int = Field(..., examples=[1])
    title: str = Field(..., examples=["Titolo del post"])
    descrizione: str = Field(..., examples=["Descrizione del post"])
