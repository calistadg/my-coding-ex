import os
import time

from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

load_dotenv()

DB_NAME = "test_db"
COLLECTION_NAME = "test_collection_pdf"
ATLAS_VECTOR_SEARCH_INDEX_NAME = "test-index-pdf"

# Must match the number of dimensions produced by your embedding model.
# Change this if your course uses a different embedding size.
EMBEDDING_DIMENSIONS = 1536


def main():
    mongodb_uri = os.getenv("MONGODB_URI")
    if not mongodb_uri:
        raise ValueError("Please add MONGODB_URI to your .env file.")

    with MongoClient(mongodb_uri) as client:
        client.admin.command("ping")
        print("Connected to MongoDB Atlas.")

        database = client[DB_NAME]

        # Create the collection if it does not already exist.
        if COLLECTION_NAME not in database.list_collection_names():
            database.create_collection(COLLECTION_NAME)
            print(f"Created collection: {COLLECTION_NAME}")

        collection = database[COLLECTION_NAME]

        # Avoid creating the same index again when rerunning the script.
        existing_indexes = list(collection.list_search_indexes())
        index_exists = any(
            index["name"] == ATLAS_VECTOR_SEARCH_INDEX_NAME
            for index in existing_indexes
        )

        if not index_exists:
            index_model = SearchIndexModel(
                name=ATLAS_VECTOR_SEARCH_INDEX_NAME,
                type="vectorSearch",
                definition={
                    "fields": [
                        {
                            "type": "vector",
                            "path": "embedding",
                            "numDimensions": EMBEDDING_DIMENSIONS,
                            "similarity": "cosine",
                        }
                    ]
                },
            )

            collection.create_search_index(model=index_model)
            print(f"Requested index: {ATLAS_VECTOR_SEARCH_INDEX_NAME}")
        else:
            print(f"Index already exists: {ATLAS_VECTOR_SEARCH_INDEX_NAME}")

        # Index creation runs in the background.
        print("Waiting for the index to become ready...")
        deadline = time.monotonic() + 300

        while time.monotonic() < deadline:
            indexes = list(
                collection.list_search_indexes(
                    name=ATLAS_VECTOR_SEARCH_INDEX_NAME
                )
            )

            if indexes:
                index = indexes[0]
                status = index.get("status", "UNKNOWN")

                if status == "FAILED":
                    raise RuntimeError(
                        "Index creation failed. Check its status in Atlas."
                    )

                if status == "READY" and index.get("queryable"):
                    print("\nSuccess! Your vector index is ready.")
                    print(f"Database:   {DB_NAME}")
                    print(f"Collection: {COLLECTION_NAME}")
                    print(f"Index:      {ATLAS_VECTOR_SEARCH_INDEX_NAME}")
                    print("Field:      embedding")
                    return

            time.sleep(5)

        print(
            "The index is still building. "
            "Check Search & Vector Search in MongoDB Atlas."
        )


if __name__ == "__main__":
    main()