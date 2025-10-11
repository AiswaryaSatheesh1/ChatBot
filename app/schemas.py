from pydantic import BaseModel, EmailStr
from typing import List
from datetime import datetime


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

class MessageSchema(BaseModel):
    sender: str
    text: str
    
class ChatSaveSchema(BaseModel):
    userId: str
    title: str
    messages: List[MessageSchema]
    
class QueryReq(BaseModel):
    question: str
    chatid: str

class QueryRes(BaseModel):
    answer: str

class Message(BaseModel):
    question: str
    answer: str

class Chat(BaseModel):
    Id: str
    userId: str
    title: str
    messages: List[Message]
    createdat: datetime
    updatedat: datetime




