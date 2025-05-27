from google.cloud import firestore
from typing import Dict, List, Any, Optional
import datetime

class FirestoreService:
    def __init__(self):
        # Initialize Firestore client
        self.db = firestore.Client()
    
    # User Operations
    
    async def get_user(self, user_id: str) -> Optional[Dict]:
        """Retrieve a user by ID"""
        user_ref = self.db.collection('users').document(user_id)
        doc = user_ref.get()
        return doc.to_dict() if doc.exists else None
    
    async def update_user(self, user_id: str, user_data: Dict) -> Dict:
        """Update user information"""
        user_ref = self.db.collection('users').document(user_id)
        user_data['updated_at'] = datetime.datetime.now()
        user_ref.update(user_data)
        return user_data
    
    # Mood Tracking Operations
    
    async def save_mood_entry(self, user_id: str, mood_data: Dict) -> Dict:
        """Save a new mood entry"""
        # Include timestamp and user ID
        mood_data['timestamp'] = datetime.datetime.now()
        mood_data['user_id'] = user_id
        
        # Add to mood history collection
        mood_ref = self.db.collection('users').document(user_id).collection('mood_history').document()
        mood_data['id'] = mood_ref.id
        mood_ref.set(mood_data)
        
        # Update user's current mood
        user_ref = self.db.collection('users').document(user_id)
        user_ref.update({
            'current_mood': mood_data['mood'],
            'last_mood_timestamp': mood_data['timestamp']
        })
        
        return mood_data
    
    async def get_mood_history(self, user_id: str, limit: int = 30) -> List[Dict]:
        """Get mood history for a user"""
        mood_ref = self.db.collection('users').document(user_id).collection('mood_history')
        query = mood_ref.order_by('timestamp', direction=firestore.Query.DESCENDING).limit(limit)
        docs = query.stream()
        
        return [doc.to_dict() for doc in docs]
    
    # Activity Operations
    
    async def save_activity_rating(self, user_id: str, activity_data: Dict) -> Dict:
        """Save an activity rating"""
        # Include timestamp and user ID
        activity_data['timestamp'] = datetime.datetime.now()
        activity_data['user_id'] = user_id
        
        # Add to activities collection
        activity_ref = self.db.collection('users').document(user_id).collection('activities').document()
        activity_data['id'] = activity_ref.id
        activity_ref.set(activity_data)
        
        return activity_data
    
    async def get_user_activities(self, user_id: str, limit: int = 10) -> List[Dict]:
        """Get recent activities for a user"""
        activities_ref = self.db.collection('users').document(user_id).collection('activities')
        query = activities_ref.order_by('timestamp', direction=firestore.Query.DESCENDING).limit(limit)
        docs = query.stream()
        
        return [doc.to_dict() for doc in docs]
    
    # Chat Message Operations
    
    async def save_chat_message(self, user_id: str, message_data: Dict) -> Dict:
        """Save a chat message"""
        # Include timestamp and user ID
        message_data['timestamp'] = datetime.datetime.now()
        message_data['user_id'] = user_id
        
        # Add to chat history collection
        chat_ref = self.db.collection('users').document(user_id).collection('chat_history').document()
        message_data['id'] = chat_ref.id
        chat_ref.set(message_data)
        
        return message_data
    
    async def get_chat_history(self, user_id: str, limit: int = 50) -> List[Dict]:
        """Get chat history for a user"""
        chat_ref = self.db.collection('users').document(user_id).collection('chat_history')
        query = chat_ref.order_by('timestamp', direction=firestore.Query.ASCENDING).limit(limit)
        docs = query.stream()
        
        return [doc.to_dict() for doc in docs]
    
    # Other Utility Methods
    
    async def create_batch_operation(self, operations: List[Dict]) -> None:
        """
        Perform batch operations
        
        Example:
        operations = [
            {'operation': 'set', 'collection': 'users', 'document': 'user123', 'data': {'name': 'John'}},
            {'operation': 'update', 'collection': 'stats', 'document': 'global', 'data': {'user_count': firestore.Increment(1)}}
        ]
        """
        batch = self.db.batch()
        
        for op in operations:
            doc_ref = self.db.collection(op['collection']).document(op['document'])
            
            if op['operation'] == 'set':
                batch.set(doc_ref, op['data'])
            elif op['operation'] == 'update':
                batch.update(doc_ref, op['data'])
            elif op['operation'] == 'delete':
                batch.delete(doc_ref)
        
        batch.commit()