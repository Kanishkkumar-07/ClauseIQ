from google import genai
from qdrant_client import QdrantClient
from dotenv import load_dotenv
import os

# from pprint import pprint

load_dotenv()

Client = genai.Client(
    api_key= os.getenv("EMBEDDING_API_KEY")
)

Generator_Client = genai.Client(
    api_key = os.getenv("GENERATOR_API_KEY")
)

qdrant = QdrantClient(
    host = "localhost",
    port = 6333
)

query = input("Enter your query: ")

response = Client.models.embed_content(
    model = "models/gemini-embedding-001",
    contents = query
)

query_vector = response.embeddings[0].values

results = qdrant.query_points(
    collection_name = "ClauseIQ",
    query = query_vector,
    limit = 5
)

context = "\n\n".join([result.payload["content"] for result in results.points])

prompt = f"""Answer the question based on the following context: You are a legal document assistant. Answer ONLY using the provided context. 
If the answer is not present in the context,
say:I could not find that information in the document.\n\n{context} \n\nQuestion: {query}"""

response = Generator_Client.models.generate_content(
    model = "models/gemini-2.5-flash",
    contents = prompt,
    config = genai.types.GenerateContentConfig(
        temperature = 0.7,
        max_output_tokens = 2000
    )
)

print("Answer: ", response.text)