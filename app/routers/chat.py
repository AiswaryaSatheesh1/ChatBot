from fastapi import APIRouter
from app.schemas import ChatRequest, ChatResponse
from app.services.ai import get_ai_reply  

router = APIRouter(tags=["Chat"])

@router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):

    reply = get_ai_reply(req.message)
    return {"reply": reply}
