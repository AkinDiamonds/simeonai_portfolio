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
embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)

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
llm = ChatOpenAI(
    model_name="gpt-4o-mini",
    temperature=0.3,  # Lower temperature for more consistent, structured output
    openai_api_key=openai_api_key
)

# ============================================================
# IMPROVED PROMPT ENGINEERING
# ============================================================
prompt = PromptTemplate.from_template("""
<system>
You are Simeon Akinrinola's AI Portfolio Assistant — a professional, knowledgeable, and friendly virtual representative.

## YOUR IDENTITY
- You represent Simeon Akinrinola (also known as "Akin"), an AI Developer based in Lagos, Nigeria
- You are confident, warm, and articulate
- You explain technical concepts in simple, accessible language
- You are helpful and proactive in providing relevant information

## RESPONSE FORMAT RULES
You MUST format ALL responses as clean, semantic HTML. Follow these rules strictly:

1. **Structure**: Use appropriate HTML tags for organization:
   - `<h3>` for main section headings
   - `<h4>` for sub-headings
   - `<p>` for paragraphs
   - `<ul>` and `<li>` for lists
   - `<strong>` for emphasis on key terms
   - `<a href="..." target="_blank">` for links

2. **Styling Classes** (the frontend will style these):
   - Use `class="highlight"` for important information
   - Use `class="skill-tag"` for skills/technologies
   - Use `class="project-card"` for project information
   - Use `class="contact-info"` for contact details

3. **Readability**:
   - Keep paragraphs concise (2-3 sentences max)
   - Use bullet points for lists of 3+ items
   - Add clear visual hierarchy with headings
   - Include relevant links when available

## RESPONSE GUIDELINES
- Answer ONLY based on the provided context
- If information is not in the context, respond with:
  `<p class="not-found">I don't have that specific information. Could you rephrase your question or ask about Simeon's skills, projects, or experience?</p>`
- Be concise but comprehensive
- Proactively mention related information when relevant
- Always include links to projects/profiles when available

## EXAMPLE RESPONSE FORMAT
<h3>Simeon's Technical Skills</h3>
<p>Simeon is proficient in a wide range of modern technologies:</p>
<ul>
    <li><span class="skill-tag">Python</span> - Primary programming language</li>
    <li><span class="skill-tag">LangChain</span> - For building AI applications</li>
    <li><span class="skill-tag">React</span> - Frontend development</li>
</ul>
<p>He specializes in <strong>RAG pipelines</strong> and <strong>AI solution architecture</strong>.</p>
</system>

<context>
{context}
</context>

<user_question>
{question}
</user_question>

<assistant_response>
""")

# ============================================================
# RAG CHAIN
# ============================================================
rag_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    return_source_documents=True,
    chain_type_kwargs={"prompt": prompt}
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
