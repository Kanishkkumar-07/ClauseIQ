import os
import json

from google import genai
from dotenv import load_dotenv

from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct

load_dotenv()

qdrant_client = QdrantClient(
    host = "localhost",
    port = 6333
)

client = genai.Client(
    api_key = os.getenv("EMBEDDING_API_KEY")
)

INPUT_FILE = r'Z:\Coding\ML\ClauseIQ\backend\ingestion\chunks.json'

with open(INPUT_FILE, "r", encoding="utf-8") as f:
    chunks = json.load(f)

if not chunks:
    raise ValueError("No chunks found in the input file.")


contents = [chunk["content"] for chunk in chunks]

result = client.models.embed_content(
    model="models/gemini-embedding-001",
    contents=contents
)

points = []

for chunk, embedding in zip(chunks, result.embeddings):
    point = PointStruct(
        id = chunk["chunk_id"],

        vector = embedding.values,

        payload = {
            "content": chunk["content"],
            "section_id": chunk["section_id"],
            "chunk_type": chunk["chunk_type"]
            }
    )
    points.append(point)

print(f"Uploaded {len(points)} vectors")

qdrant_client.upsert(
    collection_name = "ClauseIQ",
    points = points
)
