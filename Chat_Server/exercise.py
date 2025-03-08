from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class ExerciseRequest(BaseModel):
    text: str

@app.post("/exercise")
def handle_exercise(request: ExerciseRequest):
    return {"message": "This text is related to Exercise.", "input": request.text}
