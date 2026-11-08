from fastapi import FastAPI, Query
from example_5 import chain

app = FastAPI(title="Modern RAG API for Diabetes PDF")


@app.get("/ask")
def ask_question(
    question: str = Query(
        ...,
        min_length=1,
        description="The user's medical query",
    ),
):
    answer = chain.invoke(question)

    return {"answer": answer}