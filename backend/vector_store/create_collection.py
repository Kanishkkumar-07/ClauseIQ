from qdrant_client.models import Distance, VectorParams

from qdrant_client import QdrantClient

client = QdrantClient(
    host ="localhost",
    port = 6333
)

client.create_collection(
    collection_name = "ClauseIQ",
    vectors_config = VectorParams(
        size = 3072,
        distance = Distance.COSINE
    )
)

