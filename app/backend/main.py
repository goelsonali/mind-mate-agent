from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from agent_logic import process_user_message
from activity_manager import get_daily_activity, rate_activity
from app.models import MoodEntry, ChatRequest
from mood_manager import add_mood, get_mood_history, get_today_mood
from mood_image_generator import generate_mood_collage
from chat_manager import chat_with_user

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os
from dotenv import load_dotenv
from app.routes import prompts, chat, mood, auth, user
import jwt
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# Load environment variables
load_dotenv()

# Initialize the app
    
app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:5173",  # Frontend dev server
    os.getenv("FRONTEND_URL", "https://mindmate-frontend-6xntrakg7q-nw.a.run.app")  # Production frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Google Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# Security
security = HTTPBearer()
JWT_SECRET = os.getenv("JWT_SECRET", "your-default-jwt-secret")  # Change in production

# Authentication dependency
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=["HS256"])
        return payload
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

# Include routers
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(chat.router)
app.include_router(mood.router)
app.include_router(prompts.router)

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "MindMate Backend is Running"}

@app.post("/chat")
async def chat(request: ChatRequest):
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
       # Example response logic
    response_message = await chat_with_user(request.user_id, request.message)
    return {"reply": response_message}

@app.get("/daily-activity/{user_id}")
async def get_activity(user_id: str, mood):
    activity_list = get_daily_activity(user_id, mood)
    return {"user_id": user_id, "activities": activity_list}

@app.post("/daily-activity/rate")
async def rate_today_activity(request: Request):
    data = await request.json()
    user_id = data.get("user_id")
    rating = data.get("rating")  # e.g., 1–5
    success = rate_activity(user_id, rating)
    return {"success": success}

@app.post("/mood")
async def log_mood(entry: MoodEntry):
    success = add_mood(entry.user_id, entry.mood, entry.journal, entry.tracking_date)
    return {"success": success, "message": "Mood logged successfully"}

@app.get("/mood/{user_id}")
async def mood_history(user_id: str):
    history = get_mood_history(user_id)
    return {"user_id": user_id, "history": history}

@app.get("/mood/today/{user_id}")
async def today_mood(user_id: str):
    mood = get_today_mood(user_id)
    if mood:
        return {"user_id": user_id, "mood": mood}
    return {"user_id": user_id, "message": "No mood logged for today"}

@app.get("/mood/collage/{user_id}")
async def mood_collage(user_id: str):
    mood_history = get_mood_history(user_id)

    if not mood_history:
        return {"error": "No mood history found for this user."}

    # Generate the collage image
   #  collage_path = generate_mood_collage(user_id, mood_history)
    return {"user_id": user_id, "collage_path": "collage_path"}

@app.get("/image/{image_name}")
async def get_image(image_name: str):
    file_path = f"app/backend/generated_images/{image_name}"
    return FileResponse(file_path)