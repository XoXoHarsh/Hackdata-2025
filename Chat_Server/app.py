import logging
import uvicorn
import httpx
from fastapi import FastAPI
from pydantic import BaseModel
import pickle

MODEL_PATH="question_classifier_model.pkl"
try:
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    logging.info("Model loaded")
except Exception as e:
    logging.error(f"Error loading model: {e}")
    model = None

logging.basicConfig(level=logging.INFO)

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CATEGORY_URLS = {
    0: "http://localhost:8004/api/generate",
    1: "http://localhost:8005/api/generate",
    2: "http://localhost:8006/api/generate",
}

OLLAMA_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "test"

class MessageRequest(BaseModel):
    message: str  

def classify_message(message: str):
    """
    A simple rule-based classification function.
    Returns a category number.
    """
    if model is None:
        logging.error("Model is not loaded. Using default classification.")
        return 0  

    try:
        
        category = model.predict([message])[0]  
        if category == "Exercise":
            return 2
        elif category == "Stress":
            return 1
        else:
            return 0
    except Exception as e:
        logging.error(f"Model classification error: {e}")
        return 0 

async def generate_ollama_response(prompt: str, category_number: int):
    """
    Sends the message to the Ollama model and gets a response.
    """
    payload = {"model": OLLAMA_MODEL, "prompt": prompt, "stream": False}

    async with httpx.AsyncClient() as client:
        response = await client.post(CATEGORY_URLS[category_number], json=payload)
        response_data = response.json()
    
    return response_data.get("response", "No response from model")

@app.post("/classify-message")
async def classify_message_api(request: MessageRequest):
    """
    Receives a message, classifies it, fetches a response from the mapped service,
    then queries Ollama for the final response, which is sent to the frontend.
    """
    logging.info(f"Received Message: {request.message}")
    
    category_number = classify_message(request.message)
    service_url = CATEGORY_URLS.get(category_number)

    logging.info(f"Predicted Category Number: {category_number}")
    logging.info(f"Mapped Service URL: {service_url}")

    ollama_response = await generate_ollama_response(request.message, category_number)

    return {"response": ollama_response}  

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
