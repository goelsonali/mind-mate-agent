import firebase_admin
from firebase_admin import credentials, firestore
import os
from datetime import datetime
from typing import Dict, Optional

# Initialize Firebase Admin with credentials
def init_firebase():
    try:
        # First try to use credentials file path
        cred_path = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
        if cred_path:
            try:
                cred = credentials.Certificate(cred_path)
                firebase_admin.initialize_app(cred)
                return firestore.client()
            except ValueError:
                print("Invalid credentials file, trying JSON content...")
        
        # If file path fails, try using JSON content
        cred_json = os.getenv('FIREBASE_CREDENTIALS_JSON')
        if cred_json:
            import json
            try:
                cred_dict = json.loads(cred_json)
                cred = credentials.Certificate(cred_dict)
                firebase_admin.initialize_app(cred)
                return firestore.client()
            except (ValueError, json.JSONDecodeError) as e:
                print(f"Error parsing credentials JSON: {e}")
                raise
        
        raise ValueError("No valid Firebase credentials found in environment variables")
    except Exception as e:
        print(f"Error initializing Firebase: {e}")
        raise

# Initialize Firestore
db = init_firebase()

async def save_user(user_data: Dict):
    """Save or update user data in Firestore"""
    try:
        users_ref = db.collection('users')
        user_ref = users_ref.document(user_data['user_id'])
        
        # Add timestamp
        user_data['last_login'] = datetime.utcnow()
        
        # Check if user exists
        user_doc = user_ref.get()
        if user_doc.exists:
            # Update existing user
            user_ref.update({
                'last_login': user_data['last_login'],
                'name': user_data.get('name', ''),
                'picture': user_data.get('picture', ''),
                'email': user_data['email']
            })
        else:
            # Create new user with initial data
            user_data['created_at'] = datetime.utcnow()
            user_data['mood_history'] = []
            user_data['activity_history'] = []
            user_ref.set(user_data)
            
        return True
    except Exception as e:
        print(f"Error saving user to Firestore: {str(e)}")
        return False

async def get_user(user_id: str) -> Optional[Dict]:
    """Get user data from Firestore"""
    try:
        user_ref = db.collection('users').document(user_id)
        user_doc = user_ref.get()
        
        if user_doc.exists:
            return user_doc.to_dict()
        return None
    except Exception as e:
        print(f"Error getting user from Firestore: {str(e)}")
        return None

async def update_user_mood(user_id: str, mood: str):
    """Update user's mood history"""
    try:
        user_ref = db.collection('users').document(user_id)
        user_ref.update({
            'mood_history': firestore.ArrayUnion([{
                'mood': mood,
                'timestamp': datetime.utcnow()
            }])
        })
        return True
    except Exception as e:
        print(f"Error updating user mood: {str(e)}")
        return False

async def save_activity_rating(user_id: str, activity: str, rating: int):
    """Save user's activity rating"""
    try:
        user_ref = db.collection('users').document(user_id)
        user_ref.update({
            'activity_history': firestore.ArrayUnion([{
                'activity': activity,
                'rating': rating,
                'timestamp': datetime.utcnow()
            }])
        })
        return True
    except Exception as e:
        print(f"Error saving activity rating: {str(e)}")
        return False
