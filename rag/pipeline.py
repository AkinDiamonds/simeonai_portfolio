import os
import re
from dotenv import load_dotenv

from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.docstore.document import Document
from langchain_community.vectorstores import Chroma
from langchain_classic.chains import RetrievalQA
from langchain_classic.prompts import PromptTemplate

load_dotenv()

# Load API keys
openai_api_key = os.getenv("OPENAI_API_KEY")

# Load the main document
try:
    with open("Simeon_Akinrinola_profile.txt", "r", encoding="utf-8") as f:
        main_doc = f.read()
except FileNotFoundError:
    main_doc = ""
    print("Warning: Simeon_Akinrinola_profile.txt not found. Using empty context.")

# ============================================================
# IMPROVED SEMANTIC CHUNKING
# ============================================================
# Instead of blindly splitting by delimiter, we create meaningful
# semantic chunks based on document sections with proper metadata

def create_semantic_chunks(document_text: str) -> list[Document]:
    """
    Create semantically meaningful chunks from the profile document.
    Each chunk represents a logical section with rich metadata for better retrieval.
    """
    chunks = []
    
    # Split by the section delimiter
    sections = document_text.split("________________")
    
    # Define section type patterns for better categorization
    section_patterns = {
        "personal_info": r"^Name:|^Email:|^Phone:|^LinkedIn:|^Location:",
        "skills": r"^Skills:|^Technical Skills:|^Soft Skills:",
        "experience": r"^Professional Experience:|^Title:",
        "education": r"^Education:|^Degree:|^Institution:",
        "projects": r"^Projects?:|^Project:",
        "personal_statement": r"^Personal Statement:"
    }
    
    def identify_section_type(text: str) -> str:
        """Identify the type of section based on content patterns."""
        for section_type, pattern in section_patterns.items():
            if re.search(pattern, text, re.MULTILINE | re.IGNORECASE):
                return section_type
        return "general"
    
    def extract_key_entities(text: str, section_type: str) -> dict:
        """Extract key entities based on section type for metadata."""
        entities = {}
        
        if section_type == "personal_info":
            name_match = re.search(r"^Name:\s*(.+)$", text, re.MULTILINE)
            email_match = re.search(r"^Email:\s*(.+)$", text, re.MULTILINE)
            if name_match:
                entities["name"] = name_match.group(1).strip()
            if email_match:
                entities["email"] = email_match.group(1).strip()
                
        elif section_type == "experience":
            titles = re.findall(r"^Title:\s*(.+)$", text, re.MULTILINE)
            companies = re.findall(r"^Company:\s*(.+)$", text, re.MULTILINE)
            entities["job_titles"] = ", ".join(titles) if titles else ""
            entities["companies"] = ", ".join(companies) if companies else ""
            
        elif section_type == "projects":
            project_names = re.findall(r"^Name:\s*(.+)$", text, re.MULTILINE)
            entities["project_names"] = ", ".join(project_names) if project_names else ""
            
        elif section_type == "education":
            degree_match = re.search(r"^Degree:\s*(.+)$", text, re.MULTILINE)
            institution_match = re.search(r"^Institution:\s*(.+)$", text, re.MULTILINE)
            if degree_match:
                entities["degree"] = degree_match.group(1).strip()
            if institution_match:
                entities["institution"] = institution_match.group(1).strip()
                
        elif section_type == "skills":
            # Extract all skills mentioned
            skills_text = text.lower()
            tech_keywords = ["python", "react", "langchain", "openai", "fastapi", 
                           "tailwindcss", "transformers", "torch", "embeddings", 
                           "vector stores", "prompt engineering"]
            found_skills = [s for s in tech_keywords if s in skills_text]
            entities["skills"] = ", ".join(found_skills) if found_skills else ""
            
        return entities
    
    # Process each section
    for section in sections:
        section = section.strip()
        if not section:
            continue
            
        section_type = identify_section_type(section)
        entities = extract_key_entities(section, section_type)
        
        # Create the chunk with rich metadata
        chunk = Document(
            page_content=section,
            metadata={
                "section_type": section_type,
                "char_count": len(section),
                "has_urls": bool(re.search(r'https?://', section)),
                **entities
            }
        )
        chunks.append(chunk)
    
    # For the projects section, create individual project chunks for better retrieval
    projects_section = None
    for chunk in chunks:
        if chunk.metadata.get("section_type") == "projects":
            projects_section = chunk
            break
    
    if projects_section:
        # Split projects into individual chunks
        project_blocks = re.split(r'\n(?=Project:)', projects_section.page_content)
        
        for block in project_blocks:
            block = block.strip()
            if not block or block == "Projects:":
                continue
                
            name_match = re.search(r"^Name:\s*(.+)$", block, re.MULTILINE)
            desc_match = re.search(r"^Description:\s*(.+)$", block, re.MULTILINE)
            lang_match = re.search(r"^Primary Language:\s*(.+)$", block, re.MULTILINE)
            url_match = re.search(r"^GitHub URL:\s*(.+)$", block, re.MULTILINE)
            
            project_chunk = Document(
                page_content=block,
                metadata={
                    "section_type": "individual_project",
                    "project_name": name_match.group(1).strip() if name_match else "Unknown",
                    "description": desc_match.group(1).strip() if desc_match else "",
                    "languages": lang_match.group(1).strip() if lang_match else "",
                    "github_url": url_match.group(1).strip() if url_match else ""
                }
            )
            chunks.append(project_chunk)
    
    return chunks

# Create semantic chunks
lc_chunks = create_semantic_chunks(main_doc)

print(f"✅ Created {len(lc_chunks)} semantic chunks")

# ============================================================
# VECTORSTORE SETUP
# ============================================================
from langchain_google_genai import GoogleGenerativeAIEmbeddings

embeddings = GoogleGenerativeAIEmbeddings(model="models/text-embedding-004", google_api_key=os.getenv("GOOGLE_API_KEY"))

# Force rebuild the vectorstore with new chunks
CHROMA_DIR = "./chroma_db"
if os.path.exists(CHROMA_DIR):
    import shutil
    shutil.rmtree(CHROMA_DIR)
    print("🔄 Cleared old vectorstore for fresh indexing")

vectorstore = Chroma.from_documents(
    lc_chunks,
    embeddings,
    collection_name="simeon_portfolio",
    persist_directory=CHROMA_DIR
)
print("✅ Vectorstore created and persisted")

# Setup retriever with MMR for diversity
retriever = vectorstore.as_retriever(
    search_type="mmr",  # Maximum Marginal Relevance for diverse results
    search_kwargs={
        "k": 6,
        "fetch_k": 12,  # Fetch more, then diversify
        "lambda_mult": 0.7  # Balance between relevance and diversity
    }
)

# ============================================================
# LLM SETUP
# ============================================================
from langchain_google_genai import ChatGoogleGenerativeAI

llm = ChatGoogleGenerativeAI(
    model="gemini-flash-latest",
    temperature=0.3,
    google_api_key=os.getenv("GOOGLE_API_KEY")
)

# ============================================================
# IMPROVED PROMPT ENGINEERING
# ============================================================
prompt = PromptTemplate.from_template("""
<system>
You are **Nexus**, Simeon Akinrinola's AI Digital Twin — a high-performance virtual engineer living inside a CLI.

## CORE DIRECTIVES
1. **Persona**: You are professional, technical, and concise. You sound like a system log or a senior engineer.
2. **Format**: **STRICT MARKDOWN ONLY**. Never use HTML tags (like <div>, <br>, <img>).
3. **Context**: Answer ONLY based on the provided context. If the answer is missing, return a `404_DATA_NOT_FOUND` error message playfully.

## VISUAL STYLE GUIDELINES (CRITICAL)

### 1. The "Terminal" Aesthetic
Start every technical response with a pseudo-command block that matches the user's intent.
Example:
```bash
$ access_level --user=guest --query=skills
### 2. Handling Skills (NO VERTICAL LISTS)
NEVER output a long vertical list of skills. It wastes screen space.
Group skills by category and list them horizontally using inline code ticks.
Correct Format:
Core Stack: React Python TypeScript Tailwind
AI Engineering: LangChain RAG OpenAI LlamaIndex
### 3. Presenting Projects
If asked about a project, format it as a "System Card" using blockquotes:
Project Name
One-line technical summary
![alt text](IMAGE_URL_FROM_CONTEXT)
Stack: Tech1 Tech2 Tech3
🔗 Source Code | 🎥 Live Demo
### 4. Handling Media
Check the context for [IMAGE_URL: ...] or [VIDEO_URL: ...].
YOU MUST render them using Markdown if they exist.
Syntax: ![Alt Text](URL) for images. [▶ Watch Demo](URL) for videos.
### 5. TONE & BEHAVIOR
Do not say "Hello" unless the user greets you first.
Do not repeat your name in every message.
Be direct. Get to the answer immediately.
Use emojis sparingly (e.g., ⚡, 🟢, 🚀) to indicate system status.
</system>
<context>
{context}
</context>
<user_question>
{question}
</user_question>
<assistant_response>
""")


from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

# ============================================================
# PROJECT MEDIA MAPPING
# ============================================================
# Map project names to their media assets (images/videos)
project_media = {
    "simeon-portfolio": {
        "image": "/assets/bgimage.png", # Assumes frontend can serve this
        "video": "https://www.youtube.com/embed/dQw4w9WgXcQ" # Placeholder
    },
    "ai_chatbot": {
        "image": "https://placehold.co/600x400/1a1a1a/00FF41?text=AI+Chatbot",
        "video": ""
    }
}

def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

def augment_context(docs):
    """Add media metadata to the context"""
    context = []
    for doc in docs:
        content = doc.page_content
        # Check if this doc is about a project we have media for
        for project, media in project_media.items():
            if project.lower() in content.lower():
                if media.get("image"):
                    content += f"\n[IMAGE_URL: {media['image']}]"
                if media.get("video"):
                    content += f"\n[VIDEO_URL: {media['video']}]"
        context.append(content)
    return "\n\n".join(context)

# ============================================================
# RAG CHAIN (LCEL)
# ============================================================
rag_chain = (
    {"context": retriever | augment_context, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

# ============================================================
# TEST
# ============================================================
if __name__ == "__main__":
    test_queries = [
        "What are Simeon's technical skills?",
        "Tell me about Simeon's projects",
        "What is Simeon's educational background?"
    ]
    
    for query in test_queries:
        print(f"\n{'='*60}")
        print(f"Question: {query}")
        print('='*60)
        
        result = rag_chain.invoke({"query": query})
        print("\nAnswer:")
        print(result['result'])
        print(f"\n📚 Sources used: {len(result['source_documents'])}")
