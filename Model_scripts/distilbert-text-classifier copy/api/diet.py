from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class DietRequest(BaseModel):
    text: str

@app.post("/diet")
def handle_diet(request: DietRequest):
    return {"message": "This text is related to Diet.", "input": request.text}
