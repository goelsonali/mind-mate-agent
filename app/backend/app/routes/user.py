from fastapi import APIRouter, Depends, HTTPException, status
from typing import Dict, List
from datetime import datetime
from app.db.firestore import update_user_mood, save_activity_rating, get_user
from app.auth.dependencies import get_current_user

router = APIRouter(prefix="/api/user")

@router.post("/mood")
async def update_mood(mood_data: Dict[str, str], current_user: Dict = Depends(get_current_user)):
    """Update user's current mood"""
    if not mood_data.get("mood"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Mood is required"
        )
    
    success = await update_user_mood(current_user["user_id"], mood_data["mood"])
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update mood"
        )
    
    return {"message": "Mood updated successfully"}

@router.post("/activity/rate")
async def rate_activity(
    activity_data: Dict[str, str | int],
    current_user: Dict = Depends(get_current_user)
):
    """Rate an activity"""
    activity = activity_data.get("activity")
    rating = activity_data.get("rating")
    
    if not activity or not isinstance(rating, int) or rating < 1 or rating > 5:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Valid activity and rating (1-5) are required"
        )
    
    success = await save_activity_rating(
        current_user["user_id"],
        activity,
        rating
    )
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save activity rating"
        )
    
    return {"message": "Activity rating saved successfully"}

@router.get("/profile")
async def get_profile(current_user: Dict = Depends(get_current_user)):
    """Get user's profile including mood and activity history"""
    user_data = await get_user(current_user["user_id"])
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return {
        "user_id": user_data["user_id"],
        "email": user_data["email"],
        "name": user_data.get("name", ""),
        "picture": user_data.get("picture", ""),
        "mood_history": user_data.get("mood_history", []),
        "activity_history": user_data.get("activity_history", [])
    }