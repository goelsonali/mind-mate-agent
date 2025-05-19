from datetime import date
import json
import re
from gemini_agent import GeminiAgent


agent = GeminiAgent()
agent_context = "You are MindMate, a kind mood assistant who responds with empathy."


# Example activity lists by mood
activities = {
    "low": ["Take a short walk outside", "Try deep breathing for 5 mins"],
    "neutral": ["Listen to calming music", "Journal your thoughts"],
    "high": ["Celebrate something you accomplished", "Dance to your favorite song"],
}

# Store user's daily activity and rating
activity_log = {}

def get_daily_activity(user_id, mood):
    today = str(date.today())

    prompt = f"{agent_context}\nSuggest 2 mindful activities for someone feeling : {mood}. Return only a JSON list with fields 'title' and 'description'."
    ai_response = agent.ask(prompt)

    if user_id not in activity_log or today not in activity_log[user_id]:
        activity = extract_json(ai_response)
        activity_log.setdefault(user_id, {})[today] = {"activity": activity, "rating": None}
    return activity_log[user_id][today]["activity"]

def rate_activity(user_id, rating):
    today = str(date.today())
    if user_id in activity_log and today in activity_log[user_id]:
        activity_log[user_id][today]["rating"] = rating
        return True
    return False

def extract_json(response_text: str) -> list:
    try:
        # Find the JSON part using regex
        match = re.search(r"\[\s*{.*?}\s*]", response_text, re.DOTALL)
        if match:
            # Parse and return the JSON list
            return json.loads(match.group(0))
        return []
    except json.JSONDecodeError:
        return []
