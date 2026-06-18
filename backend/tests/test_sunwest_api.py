"""Backend API tests for Sunwest Builds.

Covers:
- GET /api/ root welcome
- POST /api/status & GET /api/status round-trip
- POST /api/contact (valid + invalid email + missing fields)
- GET /api/contact list ordering + persistence verification
"""
import os
import uuid
import pytest
import requests
from datetime import datetime

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    # Fallback: read from frontend .env file
    env_path = "/app/frontend/.env"
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip()
                    break
BASE_URL = BASE_URL.rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- root ----------
class TestRoot:
    def test_root_welcome(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert isinstance(data["message"], str)
        assert len(data["message"]) > 0


# ---------- status regression ----------
class TestStatus:
    def test_status_post_and_get(self, client):
        name = f"TEST_status_{uuid.uuid4().hex[:8]}"
        r = client.post(f"{API}/status", json={"client_name": name})
        assert r.status_code == 200, r.text
        obj = r.json()
        assert obj["client_name"] == name
        assert "id" in obj and isinstance(obj["id"], str)
        assert "timestamp" in obj

        rg = client.get(f"{API}/status")
        assert rg.status_code == 200
        items = rg.json()
        assert isinstance(items, list)
        assert any(i.get("client_name") == name for i in items), "Created status not found in GET"


# ---------- contact ----------
class TestContact:
    def test_create_contact_lead_valid(self, client):
        payload = {
            "name": f"TEST_User_{uuid.uuid4().hex[:6]}",
            "email": f"test_{uuid.uuid4().hex[:6]}@example.com",
            "phone": "+1 416 555 0199",
            "project_details": "Looking to build a premium rear deck with cedar railings.",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        # Echoed fields
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["phone"] == payload["phone"]
        assert data["project_details"] == payload["project_details"]
        # Generated fields
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 10
        assert "created_at" in data
        # Verify created_at is ISO-parseable
        datetime.fromisoformat(data["created_at"].replace("Z", "+00:00"))

        # Verify persistence: GET should include it
        rg = client.get(f"{API}/contact")
        assert rg.status_code == 200
        leads = rg.json()
        assert isinstance(leads, list)
        assert any(l["id"] == data["id"] for l in leads), "Created lead not found in GET /api/contact"

    def test_create_contact_invalid_email(self, client):
        payload = {
            "name": "Bad Email",
            "email": "not-an-email",
            "phone": "1234",
            "project_details": "details",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code in (400, 422), f"Expected 4xx, got {r.status_code}: {r.text}"

    def test_create_contact_missing_fields(self, client):
        # missing email + phone + project_details
        r = client.post(f"{API}/contact", json={"name": "OnlyName"})
        assert r.status_code in (400, 422), r.text

        # empty body
        r2 = client.post(f"{API}/contact", json={})
        assert r2.status_code in (400, 422), r2.text

    def test_list_contact_ordering_desc(self, client):
        # Create two distinct leads
        payloads = []
        for i in range(2):
            p = {
                "name": f"TEST_Order_{i}_{uuid.uuid4().hex[:5]}",
                "email": f"order_{uuid.uuid4().hex[:6]}@example.com",
                "phone": "4165551122",
                "project_details": f"order test {i}",
            }
            r = client.post(f"{API}/contact", json=p)
            assert r.status_code == 201
            payloads.append(r.json())

        rg = client.get(f"{API}/contact")
        assert rg.status_code == 200
        leads = rg.json()
        # Find our two leads' positions
        ids = [l["id"] for l in leads]
        assert payloads[0]["id"] in ids and payloads[1]["id"] in ids
        idx0 = ids.index(payloads[0]["id"])
        idx1 = ids.index(payloads[1]["id"])
        # The second created should appear earlier (most-recent first)
        assert idx1 < idx0, "Leads not ordered most-recent first"
