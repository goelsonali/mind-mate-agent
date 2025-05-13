from pydantic import BaseModel
from datetime import date

class MoodEntry(BaseModel):
    user_id: str
    mood: str  # e.g., "happy", "neutral", "sad"
    journal: str = None
    tracking_date: date