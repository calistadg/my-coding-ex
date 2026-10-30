
import os
import base64

from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage

load_dotenv()

app = FastAPI(title="Video Analytics - Exercise 1")

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError("GEMINI_API_KEY is missing in .env")

llm = ChatGoogleGenerativeAI(
    model="gemini-3.8-flash",
    google_api_key=api_key
)

PROMPTS = {
    1: "Give a detailed summary of this video.",

    2: "Summarize this video in a few short bullets.",

    3: (
        "Generate a paragraph that summarizes this video "
        "with corresponding timecodes. "
        "Use timestamps from the actual video."
    ),

    4: (
        "Summarize this video. Then create a quiz "
        "with 5 questions and an answer key based "
        "on the information in this video."
    )
}


class VideoRequest(BaseModel):
    prompt_number: int


@app.get("/")
def home():
    return {
        "message": "Video Analytics Exercise 1",
        "available_prompts": PROMPTS
    }


@app.post("/analyze-video")
def analyze_video(request: VideoRequest):

    if request.prompt_number not in PROMPTS:
        raise HTTPException(
            status_code=400,
            detail="Choose a prompt number from 1 to 4."
        )

    video_file_path = "video.mp4"

    if not os.path.exists(video_file_path):
        raise HTTPException(
            status_code=404,
            detail="video.mp4 not found."
        )

    with open(video_file_path, "rb") as video_file:
        video_base64 = base64.b64encode(
            video_file.read()
        ).decode("utf-8")

    message = HumanMessage(
        content=[
            {
                "type": "text",
                "text": PROMPTS[request.prompt_number]
            },
            {
                "type": "media",
                "mime_type": "video/mp4",
                "data": video_base64
            }
        ]
    )

    try:
        response = llm.invoke([message])

        return {
            "prompt_number": request.prompt_number,
            "prompt": PROMPTS[request.prompt_number],
            "result": response.content
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
