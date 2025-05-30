# MindMate: AI Mental Health Companion
## GCP Architecture with AI Agents

This document outlines the proposed architecture for the MindMate application using Google Cloud Platform (GCP) services and AI agents.

## Table of Contents
- [Architecture Diagram](#architecture-diagram)
- [Core Components](#core-components)
  - [Frontend Deployment](#frontend-deployment)
  - [Backend Services](#backend-services)
  - [Data Storage](#data-storage)
  - [Agent System Design](#agent-system-design)

## Architecture Diagram


![image](https://github.com/user-attachments/assets/8d7b270d-766f-465e-8957-b3dc872b4529)


## Core Components

### Frontend Deployment

- **Cloud Run** (Primary)
  - Containerized React frontend
  - Global deployment with low latency
  - Secure HTTPS endpoints

### Backend Services

- **Cloud Run**
  - Containerized FastAPI/Python services
  - RESTful API endpoints for frontend communication
  - Stateless design for horizontal scaling

### Data Storage

- **Firestore**
  - User profiles and preferences
  - Mood and activity tracking data

- **Secret Manager**
  - GitHub Secrets
  - Github Workflow

### Agent System Design

**Agent System**
   - Central Interface and user session management
   - Mood Processing agent for emotional analysis and mood tracking
   - Activity Recommentation Agent recommends activities based on user's mood
   - Companion Agent for empathetic conversations

![Mind Mate _ Your Mental Wellness Companion - visual selection (2)](https://github.com/user-attachments/assets/247a81e5-1ede-4106-92ce-ab700c8b6dea)


### Mood Tracking and Activity Recommendation Flow

1. User inputs current mood and dimensions via frontend and send that information to backend.
2. Mood Analysis Agent processes input and stores result in Firestore
3. Activity Recommendation Agent analyse the past trends and current mood then recommend activities powered through AI.
4. Ranked activities are presented to user via frontend
5. User selects and completes an activity
6. Feedback Processing Agent captures post-activity metrics ( In progress feature)
7. Progress Tracking Agent updates long-term trends and insights ( In progress feature)

![Mind Mate _ Your Mental Wellness Companion - visual selection (3)](https://github.com/user-attachments/assets/fe36cb24-28a7-4f67-aebf-c5c1c6399955)


### Chat Agent Interaction Flow

1. The user submits a message through the application interface.
2. The message is sent to the backend API, where the Chat Agent processes it and generates a response using the AI model.
3. The AI-generated reply is returned to the frontend and displayed to the user in the chat interface.

![Mind Mate _ Your Mental Wellness Companion - visual selection (4)](https://github.com/user-attachments/assets/7c7ccc5c-fe6d-45a2-9db4-5d76bb0b1331)


