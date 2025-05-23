## How to Start Your Application

- **Pre-requisite**
    1. Set-up python on your machine.
    2. Get your GEMINI key to access the LLM.
    3. Create **.env file** and add your key with this variable 
    ```python
    GEMINI_API_KEY=<YOUR_KEY> 
    ```
## Backend Setup    
- **Set-up to run agent locally**
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
- **Start the application**
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
