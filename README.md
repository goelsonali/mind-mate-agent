# Mind Mate Agent: Your Mental Wellness Companion
Mind-Mate is an AI-powered application designed to support mental health through empathetic conversation, daily mood tracking, guided breathing exercises, and personalized activity suggestions. </br> Leveraging advanced language AI models, it provides users with a safe space to reflect, decompress, and find gentle encouragement-anytime, anywhere.

![image](https://github.com/user-attachments/assets/a5ab2dff-4d32-42aa-b593-d845bfe2ed79)


## Project Structure

The project is organized into two main components:

- **Frontend**: React-based UI located in `/app/frontend`
- **Backend**: FastAPI-based server located in `/app/backend`

## How to Start Your Application
- Pre-requisite
    1. Set-up python on your machine.
    2. Get your GEMINI key to access the LLM.
    3. Create **.env file** and add your key with this variable 
    ```python
    GEMINI_API_KEY=<YOUR_KEY> 
    ```
- Set-up to run agent locally
    1. Create virtual environment named `.venv`
        ```python
        python -m venv .venv
        ```
    2. Activate the virtual environment
        - Windows:
            .venv\Scripts\activate
        - macOS/Linux:
            source .venv/bin/activate

    3. Install all required dependencies
        ```python
        pip install -r requirements.txt
        ```
- Start the application
    Run the below command from your terminal
    ```python
    uvicorn app.backend.main:app --reload
    ```

## Frontend Setup

1. Navigate to the frontend directory
   ```bash
   cd app/frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```
   This will start the React development server, typically on http://localhost:5173

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
