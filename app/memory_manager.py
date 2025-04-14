from collections import deque, defaultdict

user_data = defaultdict(lambda: {"profile": {}, "history": deque(maxlen=10)})

def update_memory(user_id, message):
    user_data[user_id]["history"].append(message)

def store_user_profile(user_id, profile_data):
    user_data[user_id]["profile"].update(profile_data)

def get_user_data(user_id):
    return user_data[user_id]
