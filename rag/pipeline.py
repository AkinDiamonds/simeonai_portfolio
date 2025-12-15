import os
import re
from dotenv import load_dotenv

from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.docstore.document import Document
from langchain_community.vectorstores import Chroma
# In this environment (2025 langchain 1.1.3), standard chains/prompts are in langchain_classic
from langchain_classic.chains import RetrievalQA
from langchain_classic.prompts import PromptTemplate

load_dotenv()

# Load API keys
openai_api_key = os.getenv("OPENAI_API_KEY")

# Load and split the main document
try:
    with open("Simeon_Akinrinola_profile.txt", "r", encoding="utf-8") as f:
        main_doc = f.read()
except FileNotFoundError:
    main_doc = ""
    print("Warning: Simeon_Akinrinola_profile.txt not found. Using empty context.")

# Split into entities instead of llamaindex jare
raw_entities = main_doc.split("________________")

# Metadata extraction
def extract_name(text):
    match = re.search(r"^Name:\s*(.+)$", text, re.MULTILINE)
    return match.group(1).strip() if match else "unknown"

def extract_area(text):
    match = re.search(
        r"State\s*/\s*City\s*/\s*LGA:\s*([^\n\r]*?)(?=\s*Description:|\s*Name:|\n|$)",
        text,
        flags=re.IGNORECASE,
    )
    return match.group(1).strip() if match else "unknown"

def infer_category(text):
    name = extract_name(text).lower()
    if "beach" in name:
        return "beach"
    if "museum" in name:
        return "museum"
    if "gallery" in name or "art" in name or "theatre" in name:
        return "cultural"
    if "park" in name or "conservation" in name:
        return "park"
    return "general"

# Convert to LangChain Documents
lc_chunks = []
for e in raw_entities:
    e = e.strip()
    if not e:
        continue
    lc_chunks.append(
        Document(
            page_content=e,
            metadata={
                "name": extract_name(e),
                "area": extract_area(e),
                "category": infer_category(e),
            }
        )
    )

# Create vectorstore
embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)

if os.path.exists("./chroma_db"):
    vectorstore = Chroma(
        persist_directory="./chroma_db", 
        embedding_function=embeddings, 
        collection_name="simeonakinrinola"
    )
else:
    vectorstore = Chroma.from_documents(
        lc_chunks,
        embeddings,
        collection_name="simeonakinrinola",
        persist_directory="./chroma_db"
    )
# vectorstore.persist() # Deprecated in newer Chroma versions, auto-persists

# Setup retriever
retriever = vectorstore.as_retriever(search_kwargs={"k":5})

# Setup OpenAI LLM
llm = ChatOpenAI(
    model_name="gpt-5-nano",
    temperature=2,
    openai_api_key=openai_api_key
)

# Define prompt
prompt = PromptTemplate.from_template("""

You are Simeon Akinrinola's 24/7 virtual assistant.

Personality
Confident and warm.
Approachable and thoughtful.
You enjoy learning about AI-related topics and playing chess.
You explain AI jargon in simple, beginner-friendly language.
You always ask relevant follow-up questions when appropriate.

Response style
Keep responses concise unless a detailed explanation is explicitly requested.

Use clear sentence structure.

Always separate ideas using newlines and sufficient spacing for readability.

Avoid bold text or decorative formatting.

Instructions
Answer the user's question using only the provided context.

Do not add outside knowledge or assumptions.

If the question cannot be answered using the context, respond exactly with:

"I don't know, kindly rephrase your question."

Context
{context}

User question
{question}
""")

# RAG chain
rag_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    return_source_documents=True,
    chain_type_kwargs={"prompt": prompt}
)

if __name__ == "__main__":
    # Example query
    query = "summarize everything about simeon?"
    # Note: RetrievalQA (legacy) works with invoke but might expect specific keys.
    # We pass the input query. standard defaults usually handle 'query' or 'question'.
    result = rag_chain.invoke({"query": query})

    print("Question:", query)
    print("Answer:", result['result'])
    print("Sources:", [doc.metadata for doc in result['source_documents']])
