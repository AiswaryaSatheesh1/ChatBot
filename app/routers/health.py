from fastapi import APIRouter, Depends, HTTPException


router = APIRouter(tags=["health"])

@router.get("/")
def health():
   return {"message": "server is up"}
