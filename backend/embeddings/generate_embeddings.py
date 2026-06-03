from google import genai
from dotenv import load_dotenv
from pathlib import Path

import os
import json
import time

load_dotenv()

client = genai.Client(
    api_key = os.getenv("GOOGLE_API_KEY")
)

INPUT_FILE = r'Z:\Coding\ML\ClauseIQ\backend\ingestion\chunks.json'

with open(INPUT_FILE, "r", encoding="utf-8") as f:
    chunks = json.load(f)

if not chunks:
    print("No chunks to embed.")


contents = [chunk["content"] for chunk in chunks]

result = client.models.embed_content(
    model = "models/gemini-embedding-2",
    contents = contents
)

for chunk, embedding in zip(chunks, result.embeddings):
    chunk["embedding"] = embedding.values





