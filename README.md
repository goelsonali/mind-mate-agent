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
    uvicorn app.main:app --reload
    ```

# How to test your agent response
- Try out these endpoints
    1. Option1: Using curl command
        - curl http://localhost:8000/daily-activity/u123?mood=low

    2. (Optional) To test the post endpoint using command line in user-friendly way
        - pip install httpie
        - http POST http://127.0.0.1:8000/chat user_id="user123" message="Hello!" 