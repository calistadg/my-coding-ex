
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from argostranslate import translate

# ==================================
# 1. Initialize FastAPI
# ==================================

app = FastAPI(
    title="Text Translator API",
    description="Translation API using FastAPI and Argos Translate",
    version="1.0.0"
)

# ==================================
# 2. Enable CORS for React frontend
# ==================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==================================
# 3. Request Body Model
# ==================================

class TranslationRequest(BaseModel):
    input_language: str
    output_language: str
    text_input: str


# ==================================
# 4. Supported Languages
# ==================================

LANGUAGE_CODES = {
    "english": "en",
    "german": "de",
}

# ==================================
# 5. Home Endpoint
# ==================================

@app.get("/")
def home():
    return {
        "message": "Text Translator API is running!",
        "status": "success"
    }


# ==================================
# 6. Translation Endpoint
# ==================================

@app.post("/translate")
def translate_text(request: TranslationRequest):

    # Check empty input
    if not request.text_input.strip():
        raise HTTPException(
            status_code=400,
            detail="Please enter text to translate."
        )

    # Convert language names to codes
    input_lang = LANGUAGE_CODES.get(
        request.input_language.lower()
    )

    output_lang = LANGUAGE_CODES.get(
        request.output_language.lower()
    )

    # Check supported languages
    if not input_lang or not output_lang:
        raise HTTPException(
            status_code=400,
            detail="Unsupported language selected."
        )

    # Return original text if languages match
    if input_lang == output_lang:
        return {
            "translated_text": request.text_input
        }

    try:
        # Check installed language models
        installed_languages = translate.get_installed_languages()

        source = next(
            (lang for lang in installed_languages
             if lang.code == input_lang),
            None
        )

        target = next(
            (lang for lang in installed_languages
             if lang.code == output_lang),
            None
        )

        if source is None or target is None:
            raise HTTPException(
                status_code=400,
                detail="Translation model not installed. Please run install_model.py."
            )

        translation_model = source.get_translation(target)

        if translation_model is None:
            raise HTTPException(
                status_code=400,
                detail="This translation direction is not installed."
            )

        # Translate text
        translated = translation_model.translate(
            request.text_input
        )

        return {
            "translated_text": translated
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Translation failed: {str(e)}"
        )


# ==================================
# 7. List Installed Languages
# ==================================

@app.get("/languages")
def get_languages():

    installed = translate.get_installed_languages()

    return {
        "languages": [
            {
                "code": lang.code,
                "name": lang.name
            }
            for lang in installed
        ]
    }
