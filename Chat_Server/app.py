import logging
import uvicorn
import httpx
from fastapi import FastAPI
from pydantic import BaseModel

# Configure logging
logging.basicConfig(level=logging.INFO)

# FastAPI setup
app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

# Enable CORS in FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# URL mappings for categories
CATEGORY_URLS = {
    0: "http://localhost:8001/exercise",
    1: "http://localhost:8002/daily-routine",
    2: "http://localhost:8003/diet",
    3: "http://localhost:8004/stress",
    4: "http://localhost:8005/others",
}

OLLAMA_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "llama3.2"

class MessageRequest(BaseModel):
    message: str  # Frontend will send a 'message' field

def classify_message(message: str):
    """
    A simple rule-based classification function.
    Returns a category number.
    """
    message = message.lower()

    if any(word in message for word in ["exercise", "workout", "gym", "running"]):
        return 0  # Exercise
    elif any(word in message for word in ["routine", "schedule", "habit", "daily"]):
        return 1  # Daily Routine
    elif any(word in message for word in ["diet", "nutrition", "food", "eat", "meal"]):
        return 2  # Diet
    elif any(word in message for word in ["stress", "anxiety", "mental", "depression", "well-being"]):
        return 3  # Stress / Mental Well-being
    else:
        return 4  # Others

async def generate_ollama_response(prompt: str):
    """
    Sends the message to the Ollama model and gets a response.
    """
    payload = {"model": OLLAMA_MODEL, "prompt": prompt}

    async with httpx.AsyncClient() as client:
        response = await client.post(OLLAMA_URL, json=payload)
        response_data = response.json()
    
    return response_data.get("response", "No response from model")

@app.post("/classify-message/")
async def classify_message_api(request: MessageRequest):
    """
    Receives a message, classifies it, fetches a response from the mapped service,
    then queries Ollama for the final response, which is sent to the frontend.
    """
    logging.info(f"Received Message: {request.message}")
    
    category_number = classify_message(request.message)
    service_url = CATEGORY_URLS.get(category_number)

    # Log classification
    logging.info(f"Predicted Category Number: {category_number}")
    logging.info(f"Mapped Service URL: {service_url}")

    # Fetch the classified service response
    async with httpx.AsyncClient() as client:
        try:
            service_response = await client.post(service_url, json={"text": request.message})
            service_response_data = service_response.json()
            final_prompt = service_response_data.get("response", request.message)  # Use service response for AI
        except Exception as e:
            logging.error(f"Error calling service: {e}")
            final_prompt = request.message  # Default to user input if service fails

    # Get a response from Ollama
    ollama_response = await generate_ollama_response(final_prompt)

    return {"response": ollama_response}  # ✅ Only Ollama's response is sent to frontend

# Run FastAPI on port 8001
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
