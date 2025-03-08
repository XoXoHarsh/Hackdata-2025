from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class StressRequest(BaseModel):
    text: str

@app.post("/stress")
def handle_stress(request: StressRequest):
    return {"message": "This text is related to Stress & Mental Well-being.", "input": request.text}
