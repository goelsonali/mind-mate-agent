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

Mind Mate follows a multi-agent architecture where specialized AI agents handle different aspects of mental wellness:

1. **Main Coordinator Agent** - Central conversational interface with users
2. **Mood Analysis Agent** - Processes emotional detection and sentiment analysis
3. **Activity Recommendation Agent** - Matches current mood to appropriate activities
4. **Progress Tracking Agent** - Analyzes long-term trends and generates insights

- [Mindmate-Architecture](mindmate-architecture.md)

## 🚀 Getting Started

**Prerequisites**
- Python 3.10+
- Node.js (for frontend)

- [Guide to get started](DevelopersGuide.md)


## Deployment

This project is configured to deploy to Google Cloud Platform (GCP) using Cloud Run for both frontend and backend services. 
</br> For detailed deployment instructions, see the [DEPLOYMENT.md](DEPLOYMENT.md) file.


## Further Enhancements

- Mood Collages: Generate image based user mood history and positive journal notes.
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
