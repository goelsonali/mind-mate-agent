# Mind Mate Agent: Your Mental Wellness Companion
Mind-Mate is an AI-powered application designed to support mental health through empathetic conversation, daily mood tracking, guided breathing exercises, and personalized activity suggestions. </br> Leveraging advanced language AI models, it provides users with a safe space to reflect, decompress, and find gentle encouragement-anytime, anywhere.

![image](https://github.com/user-attachments/assets/a5ab2dff-4d32-42aa-b593-d845bfe2ed79)


## 🧰 Tech Stack
- **Frontend**: React-based UI located in `/app/frontend`
- **Backend**: FastAPI-based server located in `/app/backend`
- **AI Integration**: Gemini, HuggingFace
- **DataStore**: Firebase
- **Hosting:** GCP (Google Cloud)


## 🧱 System Architecture
- [Mindmate-Architecture](mindmate-architecture.md)

## 🚀 Getting Started
**Prerequisites**
- Python 3.10+
- Node.js (for frontend)

[Guide to get started]()


## Deployment

This project is configured to deploy to Google Cloud Platform (GCP) using Cloud Run for both frontend and backend services. For detailed deployment instructions, see the [DEPLOYMENT.md](DEPLOYMENT.md) file.

## How to Test Your Application Response
- Try out these endpoints
    1. Option1: Using curl command
        - curl http://localhost:8000/daily-activity/u123?mood=low

    2. (Optional) To test the post endpoint using command line in user-friendly way
        - pip install httpie
        - http POST http://localhost:8000/chat user_id="user123" message="Hello!"
        - http GET http://localhost:8000/daily-activity/user123?mood=excited

- For mood tracking feature
    1. To add the mood data 
        - http POST http://localhost:8000/mood user_id="user123" mood="happy" tracking_date="2025-05-12"
    2. To get the mood data for a user
        - http GET http://localhost:8000/mood/user123

Additional python libraries to install for image generation feature
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
pip install diffusers transformers

API - 
http GET http://localhost:8000/mood/collage/user123

## Architecture

Mind Mate follows a multi-agent architecture where specialized AI agents handle different aspects of mental wellness:

1. **Main Coordinator Agent** - Central conversational interface with users
2. **Mood Analysis Agent** - Processes emotional detection and sentiment analysis
3. **Activity Recommendation Agent** - Matches current mood to appropriate activities
4. **Feedback Processing Agent** - Captures and analyzes activity effectiveness
5. **Progress Tracking Agent** - Analyzes long-term trends and generates insights

For more details on the architecture, see [mindmate-architecture.md](mindmate-architecture.md).

## Further Enhancements

- Cached Collages: Save and reuse collages for the same mood history to reduce computation
- Custom Layouts: Let users choose between grid, spiral, or timeline layouts
- Advanced Visualization: Use mood statistics to add overlays or captions
- Asynchronous Processing: Use background workers (like Celery) to generate the collage without blocking the API
- Integration with wearable devices for passive mood tracking
- Personalized activity recommendations based on user feedback history

## 🌟🤝Project Team
This project was developed by a team of six members. Team members and their contributions are as follows:

**Team Members:**

- **Sonali Goel** (Backend Engineer) | [Website](https://sonaligoel.carrd.co/) | [GitHub](https://github.com/goelsonali) | [LinkedIn](https://www.linkedin.com/in/sonali-goel-tech/) | 
- **Arzu Caner** (Frontend Developer) | [GitHub](https://github.com/arzucaner) | [LinkedIn](https://www.linkedin.com/in/arzucaner/) | [YouTube](@Codearz) |
- **Sonika Janagill** (GCP Engineer) | [GitHub](https://github.com/sjanagill) | [LinkedIn](https://www.linkedin.com/in/sonikaj/) | 

</br>We would like to express our gratitude to the entire team for their contributions to our project.
