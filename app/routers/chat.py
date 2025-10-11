from fastapi import APIRouter
from app.schemas import ChatRequest, ChatResponse, Chat, QueryRes, QueryReq
from app.services.ai import get_ai_reply  

router = APIRouter(tags=["Chat"])

@router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):

    reply = get_ai_reply(req.message)
    return {"reply": reply}

# @router.post("/chat", response_model=QueryRes)
# async def chatsave(req: QueryReq):




# get the existing chat from mongo
# create a new chat if no existing chat
# make input message
# get ai reply
# save chat in mongo
# send response back

