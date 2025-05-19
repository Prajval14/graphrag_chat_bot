import os
import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

# --------------- LOGGING SETUP ------------------
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.StreamHandler(),
        # Uncomment to log to file:
        # logging.FileHandler("backend.log", encoding="utf-8")
    ]
)
logger = logging.getLogger(__name__)

# --------------- CONFIG -------------------------
TXT_PATH = os.getenv("TXT_PATH", "data/data.txt")

# --------------- FASTAPI SETUP ------------------
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------- TXT DATA LOAD ------------------
def load_lines():
    if not os.path.exists(TXT_PATH):
        logger.warning(f"Text file not found at {TXT_PATH}")
        return []
    logger.info(f"Loading text data from {TXT_PATH}")
    try:
        with open(TXT_PATH, "r", encoding="utf-8") as f:
            lines = [line.strip() for line in f if line.strip()]
        logger.info(f"Loaded {len(lines)} lines from text file")
        return lines
    except Exception as e:
        logger.error(f"Error loading text file: {e}")
        return []

# --------------- SEARCH FUNCTION -----------------
def search_lines(query, lines):
    query_lc = query.lower()
    for line in lines:
        if query_lc in line.lower():
            logger.info(f"Match found: '{line}'")
            return line
    logger.info("No match found in text file.")
    return None

# --------------- API ROUTES ---------------------
@app.on_event("startup")
async def startup_event():
    if not os.path.exists(TXT_PATH):
        logger.warning(f"Text file missing: {TXT_PATH}")
    else:
        logger.info(f"Ready. Will use text file at {TXT_PATH}")

@app.post("/chat")
async def chat(request: Request):
    req = await request.json()
    user_msg = req.get("message", "")
    logger.info(f"Received chat message: '{user_msg}'")
    lines = load_lines()
    answer = search_lines(user_msg, lines)
    return {"answer": answer or "Sorry, I couldn't find an answer in the file."}

@app.get("/")
async def root():
    return {"status": "ok", "message": "Backend is running"}
