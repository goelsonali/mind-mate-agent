from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from app.backend.agent_logic import process_user_message
from app.backend.activity_manager import get_daily_activity, rate_activity
from app.backend.models import MoodEntry
from app.backend.mood_manager import add_mood, get_mood_history, get_today_mood
from app.backend.mood_image_generator import generate_mood_collage

app = FastAPI()

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    user_id = data.get("user_id")
    message = data.get("message")
    return process_user_message(user_id, message)

@app.get("/daily-activity/{user_id}")
async def get_activity(user_id: str, mood: str = "neutral"):
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
    collage_path = generate_mood_collage(user_id, mood_history)
    return {"user_id": user_id, "collage_path": collage_path}

@app.get("/image/{image_name}")
async def get_image(image_name: str):
    file_path = f"app/backend/generated_images/{image_name}"
    return FileResponse(file_path)