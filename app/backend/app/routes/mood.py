# app/routes/mood.py
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from datetime import date
from typing import List, Dict, Any
from app.services.firestore_service import FirestoreService
from app.auth.dependencies import get_current_user

router = APIRouter()
firestore_service = FirestoreService()

class MoodEntry(BaseModel):
    mood: str
    date: date
    notes: str = None

@router.post("/mood")
async def log_mood(entry: MoodEntry, current_user: Dict = Depends(get_current_user)):
    """Save a user's mood entry"""
    try:
        user_id = current_user["sub"]
        mood_data = entry.dict()
        result = await firestore_service.save_mood_entry(user_id, mood_data)
        return {"status": "mood saved", "data": result}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error saving mood: {str(e)}"
        )

@router.get("/mood")
async def get_mood(current_user: Dict = Depends(get_current_user)):
    """Get user's mood history"""
    try:
        user_id = current_user["sub"]
        mood_history = await firestore_service.get_mood_history(user_id)
        return {"data": mood_history}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving mood history: {str(e)}"
        )