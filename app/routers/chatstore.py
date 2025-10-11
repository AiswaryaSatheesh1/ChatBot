from fastapi import APIRouter
from app.database import chats_collection
from app.schemas import ChatSaveSchema

router = APIRouter(tags=["ChatStore"])

@router.post("/save_chat")
async def save_chat(chat: ChatSaveSchema):
    result = await chats_collection.insert_one(chat.dict())
    return {"message": "Chat saved", "id": str(result.inserted_id)}

@router.get("/user_chats/{user_id}")
async def user_chats(user_id: str):
    chats = await chats_collection.find({"userId": user_id}).to_list(length=100)
    formatted_chats = []
    for idx, chat in enumerate(chats, start=1):
        formatted_chats.append({
            "id": idx,
            "title": chat.get("title", f"Chat {idx}"),
            "messages": chat.get("messages", []),
            "userId": chat.get("userId")
        })
    return formatted_chats
