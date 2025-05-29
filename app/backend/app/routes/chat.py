from fastapi import APIRouter, Request, Response, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from google.oauth2 import id_token
from google.auth.transport import requests
from firebase_admin import firestore
import os
import time
from datetime import datetime, timedelta
from typing import Dict
from app.db.firestore import db
from app.auth.dependencies import get_current_user

router = APIRouter()