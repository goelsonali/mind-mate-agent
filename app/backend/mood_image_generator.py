import os
import base64
import requests
import io
from PIL import Image, ImageDraw
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get Gemini API key from environment variables
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Create directory for generated images
image_directory = "app/backend/generated_images"
os.makedirs(image_directory, exist_ok=True)

def generate_single_mood_image(mood: str, journal: str) -> Image:
    """Generate an image using Gemini API based on mood and journal content"""
    # Create a prompt based on mood and journal
    prompt = f"Create an abstract art representation of {mood} mood. {journal if journal else ''}"
    
    # Call Gemini API for image generation
    try:
        response = requests.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent",
            headers={
                "Content-Type": "application/json",
                "x-goog-api-key": GEMINI_API_KEY
            },
            json={
                "contents": [{
                    "parts": [{
                        "text": prompt
                    }]
                }],
                "generation_config": {
                    "temperature": 0.7,
                    "topP": 0.9,
                    "topK": 40,
                    "maxOutputTokens": 2048,
                }
            }
        )
        
        # Process the response
        if response.status_code == 200:
            data = response.json()
            # Extract image data from response
            for part in data.get("candidates", [{}])[0].get("content", {}).get("parts", []):
                if "inlineData" in part:
                    image_data = part["inlineData"]["data"]
                    image_bytes = base64.b64decode(image_data)
                    return Image.open(io.BytesIO(image_bytes))
        
        # If we couldn't get an image from Gemini, create a placeholder
        print(f"Failed to generate image with Gemini API: {response.status_code}, {response.text}")
    except Exception as e:
        print(f"Error generating image with Gemini API: {e}")
    
    # Create a placeholder image if Gemini API fails
    placeholder = Image.new("RGB", (400, 400), color=get_mood_color(mood))
    draw = ImageDraw.Draw(placeholder)
    draw.text((20, 20), f"Mood: {mood}", fill="white")
    if journal:
        # Wrap text to fit the image
        wrapped_text = wrap_text(journal, 40)
        y_position = 60
        for line in wrapped_text:
            draw.text((20, y_position), line, fill="white")
            y_position += 20
    
    return placeholder

def get_mood_color(mood: str) -> tuple:
    """Return a color based on the mood"""
    mood_colors = {
        "happy": (255, 215, 0),    # Gold
        "sad": (65, 105, 225),    # Royal Blue
        "angry": (220, 20, 60),   # Crimson
        "anxious": (255, 165, 0), # Orange
        "calm": (34, 139, 34),    # Forest Green
        "excited": (255, 20, 147), # Deep Pink
        "tired": (128, 128, 128),  # Gray
        "neutral": (169, 169, 169) # Dark Gray
    }
    return mood_colors.get(mood.lower(), (100, 100, 100))

def wrap_text(text: str, width: int) -> list:
    """Wrap text to fit within a certain width"""
    words = text.split()
    lines = []
    current_line = []
    current_length = 0
    
    for word in words:
        if current_length + len(word) + len(current_line) <= width:
            current_line.append(word)
            current_length += len(word)
        else:
            lines.append(" ".join(current_line))
            current_line = [word]
            current_length = len(word)
    
    if current_line:
        lines.append(" ".join(current_line))
    
    return lines

def generate_mood_collage(user_id: str, mood_history: list) -> str:
    images = []
    for mood_entry in mood_history:
        mood = mood_entry["mood"]
        journal = mood_entry.get("journal", "")
        img = generate_single_mood_image(mood, journal)
        images.append(img)

    # Collage dimensions (2x2 grid if 4 images, else single row)
    collage_width = min(2, len(images)) * 400
    collage_height = ((len(images) + 1) // 2) * 400
    collage = Image.new("RGB", (collage_width, collage_height), color="white")

    # Paste images into the collage
    x_offset, y_offset = 0, 0
    for idx, img in enumerate(images):
        collage.paste(img, (x_offset, y_offset))
        x_offset += 400
        if x_offset >= collage_width:
            x_offset = 0
            y_offset += 400

    # Save the collage
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_name = f"{user_id}_mood_collage_{timestamp}.png"
    file_path = os.path.join(image_directory, file_name)
    collage.save(file_path)

    return file_path