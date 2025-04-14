def detect_mood(text):
    if "sad" in text or "tired" in text:
        return "low"
    elif "happy" in text or "excited" in text:
        return "high"
    else:
        return "neutral"
