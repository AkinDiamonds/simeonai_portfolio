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

@app.post("/query", response_model=QueryResponse)
async def query_rag(request: QueryRequest):
    """
    Query the RAG system with a question about Simeon.
    Returns an HTML-formatted response with source metadata.
    """
    result = rag_chain.invoke({"query": request.question})
    
    # Clean the HTML response
    answer_html = clean_html_response(result['result'])
    
    # Extract source metadata
    sources = []
    for doc in result['source_documents']:
        source_info = {
            "section_type": doc.metadata.get("section_type", "unknown"),
        }
        # Add optional metadata if present
        if "project_name" in doc.metadata:
            source_info["project_name"] = doc.metadata["project_name"]
        if "github_url" in doc.metadata:
            source_info["github_url"] = doc.metadata["github_url"]
        if "job_titles" in doc.metadata:
            source_info["job_titles"] = doc.metadata["job_titles"]
        sources.append(source_info)
    
    return QueryResponse(
        question=request.question,
        answer=answer_html,
        sources=sources,
        source_count=len(sources)
    )

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