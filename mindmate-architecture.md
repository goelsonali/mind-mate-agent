# MindMate: AI Mental Health Companion
## GCP Architecture with AI Agents

This document outlines the proposed architecture for the MindMate application using Google Cloud Platform (GCP) services and AI agents.

## Table of Contents
- [Overview](#overview)
- [Architecture Diagram](#architecture-diagram)
- [Core Components](#core-components)
  - [Frontend Deployment](#frontend-deployment)
  - [Backend Services](#backend-services)
  - [Data Storage](#data-storage)
  - [AI Agent Infrastructure](#ai-agent-infrastructure)
- [AI Agent Implementation](#ai-agent-implementation)
  - [Agent System Design](#agent-system-design)
  - [Agent Communication](#agent-communication)
- [Data Flow](#data-flow)
- [Security & Compliance](#security--compliance)
- [DevOps & Monitoring](#devops--monitoring)
- [Implementation Strategy](#implementation-strategy)
- [Cost Considerations](#cost-considerations)

## Overview

MindMate is an AI-powered mental health companion designed to help users track their moods and provide personalized activity suggestions based on their emotional state. The application leverages GCP's cloud infrastructure and AI capabilities to create an intelligent, responsive, and scalable mental health support system.

## Architecture Diagram

```mermaid

```

## Core Components

### Frontend Deployment

- **Cloud Run** (Primary)
  - Containerized React frontend
  - Automatic scaling based on demand
  - Global deployment with low latency
  - Secure HTTPS endpoints

- **Firebase Hosting** (Alternative)
  - For static content delivery
  - Built-in CDN capabilities
  - Easy deployment from CI/CD pipelines

- **Cloud CDN**
  - Accelerate content delivery globally
  - Reduce latency for static assets
  - Lower bandwidth costs

### Backend Services

- **Cloud Run**
  - Containerized FastAPI/Python services
  - RESTful API endpoints for frontend communication
  - Stateless design for horizontal scaling
  - Automatic scaling to zero when not in use

- **Cloud Functions**
  - Event-driven microservices
  - Specialized functions for specific tasks (activity processing, notification triggers)
  - Serverless execution

- **API Gateway**
  - Unified API management
  - Security policies and rate limiting
  - Authentication and authorization

### Data Storage

- **Firestore**
  - User profiles and preferences
  - Mood and activity tracking data
  - Feedback and effectiveness metrics
  - Real-time updates for dynamic UI elements

- **Cloud Storage**
  - Media assets (audio for guided activities)
  - Backup data storage
  - User-generated content (journal entries, completed exercises)

- **Secret Manager**
  - API keys for third-party services
  - Service account credentials
  - Encryption keys

### AI Agent Infrastructure

#### Option 1: Vertex AI + Custom Agents

- **Vertex AI**
  - Custom ML model deployment
  - Training pipeline for personalization models
  - Feature store for user behavior patterns
  - Prediction endpoints for real-time inference

- **Gemini API**
  - Advanced language understanding
  - Contextual conversation handling
  - Emotional tone detection and generation
  - Creative content generation for activities

- **Vertex AI Pipelines**
  - ML workflow orchestration
  - Model retraining schedules
  - Feature engineering processes

#### Option 2: Integration with Existing AI Services

- **Dialogflow CX**
  - Conversation design and flow management
  - Multi-turn conversation handling
  - Intent recognition and entity extraction
  - Integration with custom fulfillment services

- **Agent Assist**
  - Real-time suggestion generation
  - Intent classification
  - Knowledge base integration

- **Vertex AI Matching Engine**
  - Vector-based activity recommendation
  - Similarity matching for personalized suggestions
  - Fast retrieval of relevant activities

## AI Agent Implementation

### Agent System Design

1. **Main Coordinator Agent**
   - Central conversational interface with users
   - Session state management
   - Agent orchestration based on user needs
   - Context preservation across interactions

2. **Specialized Capability Agents**

   - **Mood Analysis Agent**
     - Natural language processing for emotional detection
     - Sentiment analysis on user inputs
     - Tracking mood patterns over time
     - Identifying emotional triggers

   - **Activity Recommendation Agent**
     - Matching current mood to appropriate activities
     - Considering user history and preferences
     - Taking into account time constraints and context
     - Learning from previous activity effectiveness

   - **Feedback Processing Agent**
     - Capturing structured and unstructured feedback
     - Pre/post activity rating analysis
     - Identifying effectiveness patterns
     - Refining activity recommendation models

   - **Progress Tracking Agent**
     - Long-term trend analysis
     - Insight generation from user data
     - Milestone recognition and celebration
     - Early warning for concerning patterns

### Agent Communication

- **Pub/Sub**
  - Event-based communication between agents
  - Decoupled architecture for independent scaling
  - Topic-based routing for multi-agent workflows

- **Workflows**
  - Orchestration of complex multi-agent processes
  - Error handling and retry logic
  - State management for long-running operations

- **Cloud Tasks**
  - Scheduling delayed agent actions
  - Follow-up prompts and check-ins
  - Batch processing operations

## Data Flow

### Activity Recommendation Flow

1. User inputs current mood and dimensions (energy, clarity, comfort, connection)
2. Mood Analysis Agent processes input and stores result in Firestore
3. Activity Recommendation Agent queries database for matching activities
4. Ranked activities are presented to user via frontend
5. User selects and completes an activity
6. Feedback Processing Agent captures post-activity metrics
7. Progress Tracking Agent updates long-term trends and insights

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant MoodAgent
    participant ActivityAgent
    participant Database
    
    User->>Frontend: Input mood state
    Frontend->>Backend: Send mood data
    Backend->>MoodAgent: Process mood input
    MoodAgent->>Database: Store mood analysis
    Backend->>ActivityAgent: Request recommendations
    ActivityAgent->>Database: Query activity database
    ActivityAgent->>Backend: Return matched activities
    Backend->>Frontend: Send activity suggestions
    Frontend->>User: Display recommendations
    User->>Frontend: Select & complete activity
    Frontend->>Backend: Send activity feedback
    Backend->>Database: Store activity outcome
```

## Security & Compliance

- **Cloud IAM**
  - Role-based access control
  - Service account management
  - Principle of least privilege enforcement

- **Cloud Armor**
  - DDoS protection
  - Web application firewall
  - Geographic-based access controls

- **VPC Service Controls**
  - Data exfiltration prevention
  - Service perimeter security
  - Private connectivity between services

- **Cloud KMS**
  - Encryption key management
  - Automated key rotation
  - Customer-managed encryption keys

- **Cloud DLP**
  - Sensitive data detection and redaction
  - Data tokenization options
  - Privacy controls for personal health information

- **Cloud Audit Logs**
  - Activity tracking for compliance
  - Admin and data access logging
  - System event monitoring

## DevOps & Monitoring

- **Cloud Build**
  - Continuous integration pipelines
  - Automated testing
  - Artifact creation and storage

- **Cloud Monitoring**
  - Uptime and health checks
  - Performance metrics
  - Custom dashboard creation

- **Cloud Logging**
  - Centralized log management
  - Log-based metrics
  - Log export for analysis

- **Error Reporting**
  - Exception aggregation and notification
  - Error trend analysis
  - Integration with alerting systems

- **Cloud Profiler**
  - Code-level performance insights
  - Resource utilization monitoring
  - Optimization recommendations

## Implementation Strategy

### Phase 1: MVP Infrastructure

1. Set up basic Cloud Run services for frontend and backend
2. Configure Firestore database with initial schema
3. Implement simple Gemini API integration for conversations
4. Create minimal user authentication system
5. Deploy basic mood tracking and activity suggestion features

### Phase 2: Agent Framework Development

1. Design and implement Coordinator Agent architecture
2. Build first specialized agent (Mood Analysis)
3. Establish Pub/Sub communication patterns
4. Integrate feedback mechanisms for activity effectiveness
5. Deploy initial version of Progress Tracking Agent

### Phase 3: Advanced Features & Optimization

1. Enhance agent capabilities with more specialized functions
2. Implement ML pipelines for personalization
3. Add advanced security and compliance features
4. Optimize for performance and cost efficiency
5. Develop comprehensive monitoring and alerting

## Cost Considerations

For hackathon purposes, GCP's free tier and credits provide substantial capacity:

- **Cloud Run**: Free tier includes 2M requests/month and 360K GB-seconds/month
- **Firestore**: Free tier includes 1GB storage and 50K reads/writes per day
- **Cloud Functions**: Free tier includes 2M invocations/month
- **Vertex AI**: Free credits available for new accounts
- **Gemini API**: Limited free tier available

Estimated costs for minimal viable product:
- Development/Testing phase: $0-$10/month with free tier
- Initial production with small user base: $50-$150/month
- Scaled production: Variable based on user activity

---

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
