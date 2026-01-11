# Simeon Akinrinola - AI Portfolio

https://github.com/user-attachments/assets/c1b65763-8950-428c-b7d9-d3f99c31d0f0

## Overview

This project is a modern, interactive portfolio website for Simeon Akinrinola, an AI Developer based in Lagos, Nigeria. It distinguishes itself by integrating a custom Retrieval-Augmented Generation (RAG) AI assistant directly into the interface. This assistant allows visitors to query the portfolio using natural language to learn about Simeon's skills, experience, and projects.

The application is built as a monorepo containing two main components:
1.  **Frontend**: A responsive React application with advanced animations and glassmorphism UI.
2.  **Backend**: A FastAPI-powered RAG service that indexes Simeon's profile data for intelligent retrieval.

## Project Structure

-   `/simeon-portfolio`: The frontend source code (React, Vite, Tailwind CSS).
-   `/rag`: The backend source code (Python, FastAPI, LangChain, ChromaDB).

## Technology Stack

### Frontend
-   **React**: UI library for building the interface.
-   **Vite**: Build tool and development server.
-   **Tailwind CSS**: Utility-first CSS framework for styling.
-   **Framer Motion**: Library for complex animations and transitions.

### Backend (AI & API)
-   **FastAPI**: Modern, fast web framework for building APIs.
-   **LangChain**: Framework for developing applications powered by language models.
-   **OpenAI GPT-4o-mini**: The underlying Large Language Model (LLM).
-   **ChromaDB**: Vector database for storing and retrieving semantic chunks of the portfolio data.
-   **RAG (Retrieval-Augmented Generation)**: Architecture used to ground the AI's responses in factual data from the profile.

## Features

-   **AI-Powered Query Interface**: A "Ask Meta AI" style chat interface that understands context and provides structured HTML responses.
-   **Semantic Search**: The backend uses semantic chunking to understand the intent behind user queries, retrieving relevant sections (e.g., Projects, Skills, Experience).
-   **Dynamic UI**: The frontend features a dark-themed, glassmorphic design with smooth interactions and responsive layouts.
-   **Strict Output Formatting**: The AI is engineered to return clean, semantic HTML that the frontend renders directly, ensuring a high-quality presentation of information.

## Setup and Installation

### Prerequisites
-   Node.js (v18+)
-   Python (v3.9+)
-   OpenAI API Key

### 1. Backend Setup (RAG Service)

Navigate to the `rag` directory:

```bash
cd rag
```

Create and activate a virtual environment:

```bash
# Windows
python -m venv venv
.\venv\Scripts\Activate.ps1

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Set up environment variables:
Create a `.env` file in the `rag` folder and add your OpenAI API key:

```
OPENAI_API_KEY=your_api_key_here
```

Run the server:

```bash
uvicorn main:app --reload
```
The API will be available at `http://localhost:8000`.

### 2. Frontend Setup

Open a new terminal and navigate to the `simeon-portfolio` directory:

```bash
cd simeon-portfolio
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

## Usage

1.  Ensure both the backend and frontend servers are running.
2.  Open the frontend URL in your browser.
3.  Use the search bar in the Hero section to ask questions like:
    -   "What are Simeon's core skills?"
    -   "Tell me about his experience with RAG."
    -   "List his recent projects."

## License

All rights reserved. Designed and developed by Simeon Akinrinola.
