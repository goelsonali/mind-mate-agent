from typing import List, Optional
from datetime import date

# In-memory database for simplicity
mood_db = {}

def add_mood(user_id: str, mood: str, journal: Optional[str], entry_date: date) -> bool:
    # Convert date to ISO format for consistent storage
    date_str = entry_date.isoformat()
    # Store the mood entry for the specified date
    mood_db.setdefault(user_id, {})[date_str] = {"mood": mood, "journal": journal}
    return True

def get_mood_history(user_id: str) -> List[dict]:
    return [{"date": day, "mood": data["mood"], "journal": data["journal"]} 
            for day, data in mood_db.get(user_id, {}).items()]

def get_today_mood(user_id: str) -> Optional[dict]:
    today = date.today().isoformat()
    return mood_db.get(user_id, {}).get(today)