from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    username: EmailStr
    name:str
    password: str
class UserLogin(BaseModel):
    username: EmailStr
    password: str
class ChatRequest(BaseModel):
    message: str
class ChatResponse(BaseModel):
    reply: str
