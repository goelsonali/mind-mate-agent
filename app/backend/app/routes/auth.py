from fastapi import APIRouter, Request, Response, Depends, HTTPException, status, Security
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from google.oauth2 import id_token
from google.auth.transport import requests
import os
import jwt
from datetime import datetime, timedelta
from typing import Dict, Optional
import requests as req
import json
from ..db.firestore import save_user

router = APIRouter(prefix="/auth", tags=["authentication"])
security = HTTPBearer()

# Environment variables
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID").strip('"')
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET").strip('"')
JWT_SECRET = os.getenv("JWT_SECRET", "your-default-jwt-secret").strip('"')
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
# Use environment variable for redirect URI with a development fallback
REDIRECT_URI = os.getenv("REDIRECT_URI", "http://localhost:5174/auth/callback")

# Initialize router and load environment variables

@router.get("/google")
async def google_login():
    """Redirect to Google OAuth login"""
    auth_url = f"https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id={GOOGLE_CLIENT_ID}&redirect_uri={REDIRECT_URI}&scope=openid%20email%20profile&access_type=offline&prompt=consent"
    return RedirectResponse(url=auth_url)

@router.get("/google/callback")
async def google_callback(code: str):
    """Handle Google OAuth callback"""
    try:
        # Exchange code for token
        token_url = "https://oauth2.googleapis.com/token"
        payload = {
            "code": code,
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
            "redirect_uri": REDIRECT_URI,
            "grant_type": "authorization_code"
        }
        
        response = req.post(token_url, data=payload)
        token_data = response.json()
        
        if "error" in token_data:
            return JSONResponse(
                status_code=400,
                content={"detail": f"OAuth error: {token_data.get('error_description', token_data['error'])}"}
            )
        
        if "id_token" not in token_data:
            return JSONResponse(
                status_code=400,
                content={"detail": "Authentication failed"}
            )
        
        # Get user info from Google
        userinfo_url = "https://www.googleapis.com/oauth2/v3/userinfo"
        headers = {"Authorization": f"Bearer {token_data['access_token']}"}
        userinfo_response = req.get(userinfo_url, headers=headers)
        user_info = userinfo_response.json()
        
        if "error" in user_info:
            return JSONResponse(
                status_code=400,
                content={"detail": "Failed to get user info"}
            )
        
        # Create user data
        user_data = {
            "user_id": user_info["sub"],
            "email": user_info["email"],
            "name": user_info.get("name", ""),
            "picture": user_info.get("picture", ""),
        }
        
        # Save user to Firestore
        await save_user(user_data)

        # Create JWT token
        access_token = create_jwt_token(user_data)
        
        # Redirect to frontend
        redirect_url = f"{FRONTEND_URL}?token={access_token}"
        return RedirectResponse(url=redirect_url)
        
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"detail": "Authentication failed"}
        )

def create_jwt_token(user_data: Dict) -> str:
    """Create a JWT token for the authenticated user"""
    payload = {
        "sub": user_data["user_id"],
        "email": user_data["email"],
        "name": user_data.get("name", ""),
        "exp": datetime.utcnow() + timedelta(days=1)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

async def get_current_user(credentials: HTTPAuthorizationCredentials = Security(security)) -> Dict:
    """Get current user from JWT token"""
    try:
        token = credentials.credentials
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        
        # Check if token is expired
        if payload["exp"] < datetime.utcnow().timestamp():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has expired"
            )
            
        return {
            "user_id": payload["sub"],
            "email": payload["email"],
            "name": payload.get("name", "")
        }
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )