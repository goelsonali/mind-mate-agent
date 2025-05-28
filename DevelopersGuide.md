## How to Start Your Application

- **Pre-requisite**
    1. Set-up python on your machine.
    2. Get your GEMINI key to access the LLM.
    3. Create **.env file** and add your key with this variable 
    ```python
    GEMINI_API_KEY=<YOUR_KEY> 
    ```
## Backend Setup 

1. Navigate to the backend directory
    ```bash
    cd app/backend
    ```
2. Create virtual environment named `.venv`
    ```python
    python -m venv .venv
    ```
3. Activate the virtual environment
    - Windows:
        .venv\Scripts\activate
    - macOS/Linux:
        source .venv/bin/activate

4. Install all required dependencies
    ```python
    pip install -r requirements.txt
    ```
5. Start the application
    Run the below command from your terminal ( app/backend)
    ```python
    uvicorn main:app --reload
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

## How to Test Your Application
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
