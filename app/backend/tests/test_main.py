import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert "Mind Mate" in response.text

def test_daily_activity():
    response = client.get("/daily-activity/test_user?mood=happy")
    assert response.status_code == 200
    assert "activity" in response.json()

# Add more tests as needed
