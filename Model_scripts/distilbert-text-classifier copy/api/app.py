import logging
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
import torch
import httpx

# Load the locally saved model
MODEL_PATH = "./fine_tuned_model"
tokenizer = DistilBertTokenizer.from_pretrained(MODEL_PATH)
model = DistilBertForSequenceClassification.from_pretrained(MODEL_PATH)

LABELS = ["Exercise", "Daily Routine", "Diet", "Stress Mental Well-being", "Others"]

# Classification function
def classify_text(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
    logits = outputs.logits
    probabilities = torch.nn.functional.softmax(logits, dim=-1)  # Convert to probabilities
    predicted_class = torch.argmax(probabilities).item()

    # Debug logs
    logging.info(f"Logits: {logits}")
    logging.info(f"Predicted Class Index: {predicted_class}")
    logging.info(f"Probabilities: {probabilities}")
    logging.info(f"Total Labels: {len(LABELS)}")

    # Ensure the predicted class index is within range
    if predicted_class >= len(LABELS):  
        return "Uncertain / Others"

    # Custom confidence threshold
    confidence = probabilities[0][predicted_class].item()
    if confidence < 0.5:  # Adjust this threshold based on printed probabilities
        return "Uncertain / Others"

    return LABELS[predicted_class]


# FastAPI setup
app = FastAPI()

class TextRequest(BaseModel):
    text: str

# Dictionary mapping categories to service URLs
SERVICE_URLS = {
    "Exercise": "http://localhost:8001/exercise",
    "Daily Routine": "http://localhost:8002/daily-routine",
    "Diet": "http://localhost:8003/diet",
    "Stress Mental Well-being": "http://localhost:8004/stress",
    "Others": "http://localhost:8005/others",
   
}

# Configure logging
logging.basicConfig(level=logging.INFO)

@app.post("/classify/")
def classify(request: TextRequest):
    category = classify_text(request.text)
    service_url = SERVICE_URLS.get(category, SERVICE_URLS["Others"])
    
    # Send the classified text to the corresponding service
    response = httpx.post(service_url, json={"text": request.text})
    
    # Log the category and service response
    logging.info(f"Classified Category: {category}")
    logging.info(f"Service Response: {response.json()}")
    
    return {"category": category, "service_response": response.json()}

@app.get("/example/")
def example():
    example_text = "I feel stressed due to work pressure."
    category = classify_text(example_text)
    service_url = SERVICE_URLS.get(category, SERVICE_URLS["Others"])
    
    # Send the classified text to the corresponding service
    response = httpx.post(service_url, json={"text": example_text})
    
    # Log the text and the response
    logging.info(f"Text: {example_text}")
    logging.info(f"Category: {category}")
    logging.info(f"Response: {response.json()}")
    
    return {"category": category, "service_response": response.json()}

@app.get("/sample-test/")
def sample_test():
    sample_text = "I need to improve my diet."
    category = classify_text(sample_text)
    service_url = SERVICE_URLS.get(category, SERVICE_URLS["Others"])
    
    # Send the classified text to the corresponding service
    response = httpx.post(service_url, json={"text": sample_text})
    
    # Log the text and the response
    logging.info(f"Sample Text: {sample_text}")
    logging.info(f"Category: {category}")
    logging.info(f"Service Response: {response.json()}")
    
    return {"sample_text": sample_text, "category": category, "service_response": response.json()}
