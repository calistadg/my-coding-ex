
import os
from io import BytesIO
from typing import Literal

from dotenv import load_dotenv
from pypdf import PdfReader

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# -----------------------------------
# STEP 1: Initialize FastAPI
# -----------------------------------

app = FastAPI(
    title="Halal Nadi AI Document Summarizer",
    description="AI-powered Halal document summarization",
    version="1.0.0"
)

# Allow React frontend during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# -----------------------------------
# STEP 2: Load Gemini API Key
# -----------------------------------

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError(
        "GEMINI_API_KEY is missing from the .env file"
    )

# -----------------------------------
# STEP 3: Initialize Gemini AI
# -----------------------------------

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=GEMINI_API_KEY,
    temperature=0
)

# -----------------------------------
# STEP 4: Create Halal Nadi Prompt
# -----------------------------------

prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
        You are Halal Nadi AI Assistant.

        You help Malaysian businesses understand
        their Halal-related documents.

        Analyze the document based only on the
        provided text.

        Return these sections:

        1. DOCUMENT TYPE
        2. EXECUTIVE SUMMARY
        3. KEY HALAL INFORMATION
        4. MISSING INFORMATION
        5. POTENTIAL COMPLIANCE CONCERNS
        6. RECOMMENDED ACTIONS

        Important rules:
        - Do not invent information.
        - If details are unavailable, say "Not provided".
        - Do not claim a certificate is authentic.
        - Do not make final Halal certification decisions.
        - Flag concerns for human review.
        - Do not assume official JAKIM compliance.
        - Respond in professional, clear English.
        """
    ),
    (
        "human",
        """
        Document category: {document_type}

        Analyze this document:

        {text}
        """
    )
])

# -----------------------------------
# STEP 5: Create LangChain
# -----------------------------------

chain = prompt | llm | StrOutputParser()

# -----------------------------------
# STEP 6: Extract PDF Text
# -----------------------------------

def read_pdf_file(file_contents: BytesIO) -> str:

    try:
        pdf_reader = PdfReader(file_contents)

        if pdf_reader.is_encrypted:
            raise ValueError(
                "Encrypted PDFs are not supported"
            )

        extracted_pages = []

        for page_number, page in enumerate(
            pdf_reader.pages, start=1
        ):
            page_text = page.extract_text() or ""

            extracted_pages.append(
                f"[Page {page_number}]\n{page_text}"
            )

        return "\n\n".join(extracted_pages)

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error reading PDF: {e}"
        )

# -----------------------------------
# STEP 7: Homepage
# -----------------------------------

@app.get("/")
async def home():

    return {
        "message": "Welcome to Halal Nadi AI",
        "service": "AI Document Summarization",
        "status": "running"
    }

# -----------------------------------
# STEP 8: Summarization Endpoint
# -----------------------------------

@app.post("/summarize")
async def summarize_pdf(
    file: UploadFile = File(...),
    document_type: Literal[
        "halal_certificate",
        "audit_report",
        "supplier_document",
        "halal_guideline",
        "other"
    ] = Form("other")
):

    # Validate filename
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    # Read uploaded file
    contents = await file.read()

    # Limit file size to 10 MB
    if len(contents) > 10 * 1024 * 1024:
        raise HTTPException(
            status_code=413,
            detail="PDF must not exceed 10 MB"
        )

    if not contents.startswith(b"%PDF-"):
        raise HTTPException(
            status_code=400,
            detail="Invalid PDF file"
        )

    # Extract text
    text = read_pdf_file(BytesIO(contents))

    if not text.strip():
        raise HTTPException(
            status_code=400,
            detail="No readable text found in PDF"
        )

    # Basic text limit for initial prototype
    if len(text) > 50000:
        raise HTTPException(
            status_code=413,
            detail="Document is too long for this prototype"
        )

    # Generate AI summary
    try:
        summary = await chain.ainvoke({
            "document_type": document_type,
            "text": text
        })

    except Exception as e:
        print(f"Gemini summarization error: {type(e).__name__}")

        raise HTTPException(
            status_code=502,
            detail="AI summarization failed. Check server logs and Gemini configuration."
        )

    # Return result
    return {
        "status": "success",
        "filename": file.filename,
        "document_type": document_type,
        "summary": summary,
        "disclaimer": (
            "AI-generated analysis for preliminary review only. "
            "Official Halal status must be independently verified."
        )
    }
