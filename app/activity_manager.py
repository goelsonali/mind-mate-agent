from datetime import date
import random

# Example activity lists by mood
activities = {
    "low": ["Take a short walk outside", "Try deep breathing for 5 mins"],
    "neutral": ["Listen to calming music", "Journal your thoughts"],
    "high": ["Celebrate something you accomplished", "Dance to your favorite song"],
}

# Store user's daily activity and rating
activity_log = {}

def get_daily_activity(user_id, mood="neutral"):
    today = str(date.today())
    if user_id not in activity_log or today not in activity_log[user_id]:
        activity = random.choice(activities[mood])
        activity_log.setdefault(user_id, {})[today] = {"activity": activity, "rating": None}
    return activity_log[user_id][today]["activity"]

def rate_activity(user_id, rating):
    today = str(date.today())
    if user_id in activity_log and today in activity_log[user_id]:
        activity_log[user_id][today]["rating"] = rating
        return True
    return False
