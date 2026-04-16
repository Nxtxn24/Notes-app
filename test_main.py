# test_main.py
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_create_note():
    response = client.post("/notes", json={"title": "Test", "content": "Hello"})
    assert response.status_code == 200