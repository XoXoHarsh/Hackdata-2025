from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class OthersRequest(BaseModel):
    text: str

@app.post("/others")
def handle_others(request: OthersRequest):
    return {"message": "This text does not fit any category.", "input": request.text}
