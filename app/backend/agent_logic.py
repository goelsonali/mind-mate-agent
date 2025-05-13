from app.backend.memory_manager import update_memory, get_user_data
from app.backend.mood_analyser import detect_mood
from app.backend.activity_manager import get_daily_activity
from app.backend.gemini_agent import GeminiAgent

agent = GeminiAgent()
agent_context = "You are MindMate, a kind mood assistant who responds with empathy."

def process_user_message(user_id, message):
    update_memory(user_id, {"user": message})
    
    mood = detect_mood(message)
    daily_task = get_daily_activity(user_id, mood)
    user_data = get_user_data(user_id)
    
    prompt = f"{agent_context}\nUser history: {list(user_data['history'])}\n\nUser says: {message}"
    ai_response = agent.ask(prompt)
    
    update_memory(user_id, {"ai": ai_response})
    
    return {
        "reply": ai_response,
        "mood": mood,
        "suggested_activity": daily_task
    }