# Mind Mate Agent: Your Mental Wellness Companion
Mind-Mate is an AI-powered application designed to support mental health through empathetic conversation, daily mood tracking, guided breathing exercises, and personalized activity suggestions. </br> Leveraging advanced language AI models, it provides users with a safe space to reflect, decompress, and find gentle encouragement-anytime, anywhere.

Access the application [here](https://mindmate-frontend-6xntrakg7q-nw.a.run.app/) 

[Demo of our vision](https://youtu.be/YGvHOv5sngU) 

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
3. **Activity Recommendation Agent** - Matches current mood and suggest personalised receommendation
4. **Progress Tracking Agent** - Analyzes long-term trends and generates insights

- [Mindmate-Architecture](mindmate-architecture.md)

## 🚀 Getting Started

**Prerequisites**
- Python 3.10+
- Node.js (for frontend)

- [Guide to get started](DevelopersGuide.md)


## 📡 Deployment

This project is configured to deploy to Google Cloud Platform (GCP) using Cloud Run for both frontend and backend services. 
</br> For detailed deployment instructions, see the [DEPLOYMENT.md](DEPLOYMENT.md) file.


## 🔮 Future Enhancements

- **Mood Collages:** Automatically generate visually appealing collages that capture a user’s mood history and positive journal notes, incorporating AI-driven image selection for more meaningful representations.
- **Mood Journals:** Introduce a personalised journaling feature that allows users to record their thoughts and emotions, with options to easily export or delete entries.
- **Gamification and Achievements:** Motivate users with mood-boosting challenges, streaks, and badges for positive journaling, completing recommended activities, or showing progress in self-care routines.
- **Performance:** Improving application processing by tailoring asynchronous background processing for heavy tasks.
- **Voice Input:** Let users log moods and journal notes via voice commands, making mood tracking more accessible and engaging.
- **Dynamic Visualisation:** Enhance accessibility by offering customisable visual elements and multiple display options to suit different user preferences and needs.

## 🌟🤝Project Team
This project was developed by a team of six members. Team members and their contributions are as follows:

**Team Members:**

![project_team](https://github.com/user-attachments/assets/02d72b8e-87dd-4bfe-b535-36732702b856)

- **Sonali Goel** (Team Lead | Backend Engineer) | [Website](https://sonaligoel.carrd.co/) | [GitHub](https://github.com/goelsonali) | [LinkedIn](https://www.linkedin.com/in/sonali-goel-tech/) | 
- **Arzu Caner** (Frontend Developer) | [GitHub](https://github.com/arzucaner) | [LinkedIn](https://www.linkedin.com/in/arzucaner/) | [YouTube](@Codearz) |
- **Sonika Janagill** (Backend and GCP Engineer) | [GitHub](https://github.com/sjanagill) | [LinkedIn](https://www.linkedin.com/in/sonikaj/) | 

</br>We would like to express our gratitude to the entire team for their contributions to our project.
