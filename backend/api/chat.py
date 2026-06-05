from fastapi import APIRouter
from retrieval.search import ask_question
from models.chat_models import ChatRequest, ChatResponse

router = APIRouter()

@router.post("/chat", response_model= ChatResponse)

def chat(request: ChatRequest):

    answer = ask_question(request.question, request.document_id)

    return ChatResponse(
        answer = answer
    )