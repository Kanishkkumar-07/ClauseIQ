from fastapi import APIRouter, UploadFile, File
from pathlib import Path
from ingestion.markdown_ingest import pdf_to_markdown
from ingestion.structure_chunker import create_chunks
from vector_store.upload_vectors import upload_vectors
import uuid

router = APIRouter()

@router.post("/upload")
async def upload(file : UploadFile = File(...)):
    upload_dir = Path("uploads")

    upload_dir.mkdir(exist_ok=True)
    
    document_id = str(uuid.uuid4())
    
    file_path = upload_dir / file.filename

    with open(file_path, "wb") as f:
        f.write(await file.read())

    text = pdf_to_markdown(file_path)

    chunks = create_chunks(text)

    total_points = upload_vectors(chunks,document_id)

    print(len(chunks))

    return{
        "filename" : file.filename,
        "document_id": document_id,
    }

    
    