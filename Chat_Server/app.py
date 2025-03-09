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
    0: "http://localhost:8004/api/generate",
    1: "http://localhost:8005/api/generate",
    2: "http://localhost:8006/api/generate",
}

OLLAMA_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "test"

class MessageRequest(BaseModel):
    message: str  # Frontend will send a 'message' field

def classify_message(message: str):
    """
    A simple rule-based classification function.
    Returns a category number.
    """
    if model is None:
        logging.error("Model is not loaded. Using default classification.")
        return 0  # Default category if model isn't loaded

    try:
        # Apply the same TF-IDF vectorization and predict
        category = model.predict([message])[0]  # Get prediction
        if category == "Exercise":
            return 2
        elif category == "Stress":
            return 1
        else:
            return 0
    except Exception as e:
        logging.error(f"Model classification error: {e}")
        return 0  # Default category on failureDefault category on failure


    # message = message.lower()

    # if any(word in message for word in ["exercise", "workout", "gym", "running"]):
    #     return 2  # Exercise
    # elif any(word in message for word in ["stress", "well being", "anxiety", "depression"]):
    #     return 1  # Stress
    # else:
    #     return 0

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

    # Log classification
    logging.info(f"Predicted Category Number: {category_number}")
    logging.info(f"Mapped Service URL: {service_url}")

    # Fetch the classified service response
    # async with httpx.AsyncClient() as client:
    #     try:
    #         service_response = await client.post(service_url, json={"prompt": request.message})
    #         service_response_data = service_response.json()
    #         final_prompt = service_response_data.get("response", request.message)  # Use service response for AI
    #     except Exception as e:
    #         logging.error(f"Error calling service: {e}")
    #         final_prompt = request.message  # Default to user input if service fails

    # Get a response from Ollama
    ollama_response = await generate_ollama_response(request.message, category_number)

    return {"response": ollama_response}  # ✅ Only Ollama's response is sent to frontend

# Run FastAPI on port 8001
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
