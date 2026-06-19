from pydantic import BaseModel, Field

class Contact(BaseModel):
    name:str = Field(..., example="Nome di contatto")
    email:str = Field(..., example="email@example.com")
    message:str = Field(..., example="Messaggio di contatto")