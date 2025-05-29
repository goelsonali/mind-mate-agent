import os
import json
import firebase_admin
from firebase_admin import credentials, firestore

def init_firebase():
    """Initialize Firebase with credentials and return Firestore client"""
    try:
        # First try to use credentials file path
        cred_path = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
        if cred_path and os.path.exists(cred_path):
            try:
                cred = credentials.Certificate(cred_path)
                firebase_admin.initialize_app(cred)
                print(f"Successfully initialized Firebase with credentials file: {cred_path}")
                return firestore.client()
            except Exception as e:
                print(f"Error with credentials file: {e}")
        
        # If file path doesn't exist but is set, try using it as JSON content
        if cred_path:
            try:
                # Try to load the content directly
                cred = credentials.Certificate(json.loads(cred_path))
                firebase_admin.initialize_app(cred)
                print("Successfully initialized Firebase with GOOGLE_APPLICATION_CREDENTIALS as JSON")
                return firestore.client()
            except Exception as e:
                print(f"Error parsing GOOGLE_APPLICATION_CREDENTIALS as JSON: {e}")
        
        # Try environment variables with JSON content
        cred_json = os.getenv('FIREBASE_CREDENTIALS_JSON')
        if cred_json:
            try:
                cred_dict = json.loads(cred_json)
                cred = credentials.Certificate(cred_dict)
                firebase_admin.initialize_app(cred)
                print("Successfully initialized Firebase with FIREBASE_CREDENTIALS_JSON")
                return firestore.client()
            except Exception as e:
                print(f"Error parsing FIREBASE_CREDENTIALS_JSON: {e}")
        
        # Last resort - try to find credentials file in the current directory
        local_cred_path = os.path.join(os.getcwd(), 'firebase_creds.json')
        if os.path.exists(local_cred_path):
            try:
                cred = credentials.Certificate(local_cred_path)
                firebase_admin.initialize_app(cred)
                print(f"Successfully initialized Firebase with local credentials file: {local_cred_path}")
                return firestore.client()
            except Exception as e:
                print(f"Error with local credentials file: {e}")
        
        raise ValueError("No valid Firebase credentials found")
    except Exception as e:
        print(f"Error initializing Firebase: {e}")
        raise

# Try to initialize Firestore
try:
    db = init_firebase()
    print("Firebase initialized successfully!")
except Exception as e:
    print(f"Failed to initialize Firebase: {e}")
    raise

if __name__ == "__main__":
    # Test the initialization
    print("Testing Firebase initialization...")
    try:
        db = init_firebase()
        print("Firebase initialized successfully!")
        # Try a simple operation
        users_ref = db.collection('users')
        print(f"Users collection reference: {users_ref}")
    except Exception as e:
        print(f"Error: {e}")
