# Mind mate agent

# How to start your agent ?
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

# How to test your application response
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

# Further Enhancements:
- Cached Collages: Save and reuse collages for the same mood history to reduce computation.
- Custom Layouts: Let users choose between grid, spiral, or timeline layouts.
- Advanced Visualization: Use mood statistics to add overlays or captions.
- Asynchronous Processing: Use background workers (like Celery) to generate the collage without blocking the API.