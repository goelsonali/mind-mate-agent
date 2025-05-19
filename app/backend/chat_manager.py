from gemini_agent import GeminiAgent
import asyncio

lock = asyncio.Lock()

# Define a global dictionary to store user sessions
sessions = {}

agent = GeminiAgent()
agent_context = (
    "Role: system"
    "You are Mind-Mate agent, a compassionate, empathetic, and supportive companion designed to help users with their mental well-being. "
    "Your primary role is to listen attentively, respond with kindness, and offer thoughtful guidance without judgment. "
    "You should always acknowledge the user's feelings, offer gentle encouragement, and suggest simple, mindful activities or supportive words when appropriate. "
    "Communicate as a trusted friend who is always there to listen and understand, creating a safe, calming, and non-judgmental space for the user."
    "And always respond with a positive and uplifting tone"
    "Limit your response to one concise sentence."
)

async def initialize_user_session(user_id):
    async with lock:  # Ensure safe update
        if user_id not in sessions:
            sessions[user_id] = {
                "context": agent_context,
                "history": []
            }


def generate_user_prompt(user_id, message):
    # Fetch the existing context and history from the session
    #user_data = sessions.get(user_id)
    #if not user_data:
    #    prompt = f"\nRole System: {agent_context}"
    # Update the history with the new message
    #user_data['history'].append(f"User says: {message}")

    # Construct the prompt only with the new message (since context is already set)
    prompt = f"\nRole System: {agent_context} and User says: {message}"
    return prompt


async def update_user_session(user_id, message, ai_response):
    async with lock:  # Lock to avoid race conditions
        if user_id in sessions:
            sessions[user_id]['history'].append(f"User says: {message}")
            sessions[user_id]['history'].append(f"AI says: {ai_response}")


async def chat_with_user(user_id, message):
    # Initialize user session if not already done
    if user_id not in sessions:
        await initialize_user_session(user_id)

    prompt = generate_user_prompt(user_id, message)
    ai_response = agent.ask(prompt)

    # Refine the response to limit it to one sentence
    # refined_response = ai_response.split(".")[0] + "." if "." in ai_response else ai_response
    await update_user_session(user_id, message, ai_response)
    
    return ai_response