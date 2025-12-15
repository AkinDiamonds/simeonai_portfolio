from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from pipeline import rag_chain

app = FastAPI(title="Tourist RAG API")

# Add CORS middleware to allow calls from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class QueryRequest(BaseModel):
    question: str

@app.post("/query")
def query_rag(request: QueryRequest):
    """Return answer and source metadata for a given question."""
    # Use invoke for modern LangChain chains
    result = rag_chain.invoke({"query": request.question})
    return {
        "question": request.question,
        "answer": result['result'],
        "sources": [doc.metadata for doc in result['source_documents']]
    }

@app.get("/")
def root():
    return {"message": "RAG API running. POST to /query with your question."}
