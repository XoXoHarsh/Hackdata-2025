from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class DailyRoutineRequest(BaseModel):
    text: str

@app.post("/daily-routine")
def handle_daily_routine(request: DailyRoutineRequest):
    return {"message": "This text is related to Daily Routine.", "input": request.text}
