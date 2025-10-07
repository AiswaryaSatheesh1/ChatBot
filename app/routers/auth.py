from fastapi import APIRouter, Depends, HTTPException
from app.database import users_collection
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError 
from app.utils.authutils import create_access_token
from .. import schemas
from datetime import timedelta

router = APIRouter(tags=["Auth"])

@router.post("/signup")
async def signup(req: schemas.UserCreate):
   print(req)
   existing = await users_collection.find_one({"username": req.username})
   if existing:
     raise HTTPException(status_code=400, detail="Email already registered")

   ph = PasswordHasher()
   hashed_password = ph.hash(req.password)


   new_user = {
        "username": req.username,
        "name": req.name,
        "password": hashed_password
    }

   await users_collection.insert_one(new_user)
   return {"message": "User created successfully"}

@router.post("/login")
async def login(req: schemas.UserLogin):
      user = await users_collection.find_one({"username": req.username})
      if not user:
        raise HTTPException(status_code=400, detail="Invalid username or password")
      ph = PasswordHasher()
      try:
        ph.verify(user["password"], req.password)
      except VerifyMismatchError:
        raise HTTPException(status_code=400, detail="Invalid username or password")

      
      access_token_expires = timedelta(minutes=30)
      access_token = create_access_token(
        data={"sub": user["username"]},
        expires_delta=access_token_expires
      )

      return {
        "message": "Login successful",
        "user": {
            "username": user["username"],
            "name": user["name"] 
        },
        "token": access_token
       }

 