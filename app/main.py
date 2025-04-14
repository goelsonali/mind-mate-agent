from fastapi import FastAPI, Request
from app.agent_logic import process_user_message
from app.activity_manager import get_daily_activity, rate_activity

app = FastAPI()

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    user_id = data.get("user_id")
    message = data.get("message")
    return process_user_message(user_id, message)

@app.get("/daily-activity/{user_id}")
async def get_activity(user_id: str, mood: str = "neutral"):
    activity = get_daily_activity(user_id, mood)
    return {"user_id": user_id, "activity": activity}

@app.post("/daily-activity/rate")
async def rate_today_activity(request: Request):
    data = await request.json()
    user_id = data.get("user_id")
    rating = data.get("rating")  # e.g., 1–5
    success = rate_activity(user_id, rating)
    return {"success": success}