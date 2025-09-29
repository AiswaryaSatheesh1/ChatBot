
import motor.motor_asyncio

MONGO_URL = "mongodb://root:example@localhost:27017/admin" 
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)

db = client["aichatbot"] 
users_collection = db["users"] 