import os

from google import genai
from dotenv import load_dotenv

from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct

load_dotenv()

qdrant_client = QdrantClient(
    host="localhost",
    port=6333
)

client = genai.Client(
    api_key=os.getenv("EMBEDDING_API_KEY")
)


def upload_vectors(chunks):

    if not chunks:
        raise ValueError(
            "No chunks provided."
        )

    contents = [
        chunk["content"]
        for chunk in chunks
    ]

    result = client.models.embed_content(
        model="models/gemini-embedding-001",
        contents=contents
    )

    points = []

    for chunk, embedding in zip(
        chunks,
        result.embeddings
    ):

        point = PointStruct(
            id=chunk["chunk_id"],

            vector=embedding.values,

            payload={
                "content": chunk["content"],
                "section_id": chunk["section_id"],
                "chunk_type": chunk["chunk_type"]
            }
        )

        points.append(point)

    qdrant_client.upsert(
        collection_name="ClauseIQ",
        points=points
    )

    return len(points)
