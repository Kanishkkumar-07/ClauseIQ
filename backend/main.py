from fastapi import FastAPI
from api.chat import router as chat_router

app = FastAPI(
    title="ClauseIQ API"
)

app.include_router(chat_router)

@app.get("/")
def root():
    return {
        "message": "ClauseIQ API Running"
    }
