from fastapi import APIRouter, Request, Response, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from google.oauth2 import id_token
from google.auth.transport import requests
from google.cloud import firestore
import os
import jwt
import time
from datetime import datetime, timedelta
from typing import Dict

router = APIRouter()
