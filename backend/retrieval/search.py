from google import genai
from qdrant_client import QdrantClient
from dotenv import load_dotenv
import os

load_dotenv()

Client = genai.Client(
    api_key = os.getenv("EMBEDDING_API_KEY")
)

Generator_Client = genai.Client(
    api_key = os.getenv("GENERATOR_API_KEY")
)

qdrant = QdrantClient(
    host = "localhost",
    port = 6333
)


def ask_question(query: str):

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

    context = "\n\n".join(
        result.payload["content"]
        for result in results.points
    )

    prompt = f"""
You are ClauseIQ, a legal document assistant.

Answer the user's question using only the provided context.

Provide a clear and concise response.
Do not quote the document unless necessary.


If the answer is not present in the context, respond:

"I could not find that information in the document."

Context:
{context}

Question:
{query}

Answer:
"""
    try:
        response = Generator_Client.models.generate_content(
            model = "gemini-2.5-flash",
            contents = prompt,
            config = genai.types.GenerateContentConfig(
                temperature=0.5,
                max_output_tokens=2000
            )
        )

        return response.text
    
    except Exception as e:
        print(f"Error generating answer: {e}")
        return "An error occurred while generating the answer."
#test

if __name__ == "__main__":
    query = input("Enter your query: ")

    answer = ask_question(query)

    print("\nAnswer:")
    print(answer)