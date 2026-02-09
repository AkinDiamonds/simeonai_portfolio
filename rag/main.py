from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from pipeline import rag_chain
import re

app = FastAPI(
    title="Simeon AI Portfolio API",
    description="RAG-powered API for Simeon Akinrinola's portfolio assistant",
    version="2.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    question: str

class QueryResponse(BaseModel):
    question: str
    answer: str  # HTML formatted answer
    sources: list[dict]
    source_count: int

def clean_html_response(html: str) -> str:
    """
    Clean and validate the HTML response.
    Ensures proper formatting and removes any unwanted artifacts.
    """
    # Remove any markdown-style code blocks if present
    html = re.sub(r'```html?\s*', '', html)
    html = re.sub(r'```\s*', '', html)
    
    # Remove leading/trailing whitespace
    html = html.strip()
    
    # If response doesn't start with HTML tag, wrap in paragraph
    if not html.startswith('<'):
        html = f"<p>{html}</p>"
    
    return html

from fastapi.responses import StreamingResponse
import json

@app.post("/query")
async def query_rag(request: QueryRequest):
    """
    Query the RAG system with a question about Simeon.
    Returns a streaming response of the answer.
    """
    async def generate():
        # Stream the response from the chain
        async for chunk in rag_chain.astream(request.question):
            yield chunk

    return StreamingResponse(generate(), media_type="text/plain")

@app.get("/")
def root():
    """Health check endpoint."""
    return {
        "status": "running",
        "message": "Simeon AI Portfolio API is active",
        "docs": "/docs",
        "query_endpoint": "/query"
    }

@app.get("/health")
def health():
    """Detailed health check."""
    return {
        "status": "healthy",
        "version": "2.0.0",
        "features": [
            "Semantic chunking",
            "HTML-formatted responses",
            "MMR retrieval for diversity"
        ]
    }