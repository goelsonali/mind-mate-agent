import torch
from diffusers import StableDiffusionPipeline
from PIL import Image, ImageDraw
from datetime import datetime
import os

# Initialize the pipeline once
model_id = "runwayml/stable-diffusion-v1-5"
device = "cuda" if torch.cuda.is_available() else "cpu"
pipe = StableDiffusionPipeline.from_pretrained(model_id).to(device)

image_directory = "app/backend/generated_images"
os.makedirs(image_directory, exist_ok=True)

def generate_single_mood_image(mood: str, journal: str) -> Image:
    # Create a prompt based on mood and journal
    prompt = f"An abstract art representation of {mood} mood. {journal}"
    with torch.no_grad():
        image = pipe(prompt).images[0]
    return image

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