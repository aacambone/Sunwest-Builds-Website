from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend (email) configuration
resend.api_key = os.environ.get('RESEND_API_KEY')
LEAD_NOTIFY_TO = os.environ.get('LEAD_NOTIFY_TO', 'info@sunwestbuilds.com')
LEAD_NOTIFY_FROM = os.environ.get('LEAD_NOTIFY_FROM')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create the main app without a prefix
app = FastAPI(title="Sunwest Builds API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactLeadCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=4, max_length=40)
    project_details: str = Field(min_length=1, max_length=4000)


class ContactLead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    project_details: str
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc))


# ---------- Helpers ----------
def send_lead_notification_email(lead: ContactLead) -> None:
    """
    Sends a notification email to the business when a new lead comes in.
    Failures here are logged but never raised — a flaky email send should
    never cause the lead (already safely saved in Mongo) to be lost or
    reported as a failure to the website visitor.
    """
    if not resend.api_key or not LEAD_NOTIFY_FROM:
        logger.warning(
            "Skipping lead notification email: RESEND_API_KEY or "
            "LEAD_NOTIFY_FROM not configured."
        )
        return

    try:
        resend.Emails.send({
            "from": LEAD_NOTIFY_FROM,
            "to": LEAD_NOTIFY_TO,
            "reply_to": lead.email,
            "subject": f"New website lead: {lead.name}",
            "html": (
                "<h2>New contact form submission</h2>"
                f"<p><strong>Name:</strong> {lead.name}</p>"
                f"<p><strong>Email:</strong> {lead.email}</p>"
                f"<p><strong>Phone:</strong> {lead.phone}</p>"
                f"<p><strong>Project details:</strong><br>{lead.project_details}</p>"
            ),
        })
        logger.info("Lead notification email sent for id=%s", lead.id)
    except Exception:
        logger.exception(
            "Failed to send lead notification email for id=%s", lead.id)


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Sunwest Builds API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/contact", response_model=ContactLead, status_code=201)
async def create_contact_lead(payload: ContactLeadCreate):
    """
    Lead-generation endpoint for the Sunwest Builds contact form.

    Persists the lead to MongoDB, then sends a notification email via
    Resend so the team sees new leads in their inbox right away.
    """
    lead = ContactLead(**payload.model_dump())
    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()

    try:
        await db.contact_leads.insert_one(doc)
    except Exception as exc:  # pragma: no cover - boundary
        logger.exception("Failed to persist contact lead")
        raise HTTPException(
            status_code=500, detail="Could not save lead") from exc

    logger.info(
        "NEW_CONTACT_LEAD id=%s name=%s email=%s phone=%s details_chars=%d",
        lead.id, lead.name, lead.email, lead.phone, len(lead.project_details),
    )

    # Notify the business by email. Never blocks or fails the request --
    # the lead is already safe in Mongo even if the email hiccups.
    send_lead_notification_email(lead)

    return lead


@api_router.get("/contact", response_model=List[ContactLead])
async def list_contact_leads():
    leads = await db.contact_leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for lead in leads:
        if isinstance(lead.get('created_at'), str):
            lead['created_at'] = datetime.fromisoformat(lead['created_at'])
    return leads


# Include the router in the main app
app.include_router(api_router)

# Explicitly defining permitted development and production domains
raw_origins = os.environ.get(
    'CORS_ORIGINS', 'https://sunwestbuilds.com,https://www.sunwestbuilds.com,http://localhost:3000')
origins = [origin.strip()
           for origin in raw_origins.split(',') if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()