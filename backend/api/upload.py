from fastapi import APIRouter, UploadFile, File
from pathlib import Path
from ingestion.ingest_document import ingest_pdf
from ingestion.structure_chunker import create_chunks
from vector_store.upload_vectors import upload_vectors

router = APIRouter()

@router.post("/upload")
async def upload(file : UploadFile = File(...)):
    upload_dir = Path("uploads")
    upload_dir.mkdir(exist_ok=True)

    file_path = upload_dir / file.filename

    with open(file_path, "wb") as f:
        f.write(await file.read())

    text = ingest_pdf(file_path)

    chunks = create_chunks(text)

    total_points = upload_vectors(chunks)

    return{
        "filename" : file.filename,
        "Points" : total_points
    }

    
    