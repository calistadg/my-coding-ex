
import os

from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from langchain_core.output_parsers import StrOutputParser

# Load environment variables
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is missing in .env file")

# Initialize Gemini AI
llm = ChatGoogleGenerativeAI(
    model="gemini-3.8-flash",
    google_api_key=GEMINI_API_KEY
)

# YouTube video URL
video_url = "https://www.youtube.com/watch?v=L1rR_smhD78"

# Create video analysis request
message = HumanMessage(
    content=[
        {
            "type": "text",
            "text": (
                "Describe what's happening in this video. "
                "Provide a detailed summary of its content."
            )
        },
        {
            "type": "media",
            "file_uri": video_url,
            "mime_type": "video/mp4"
        }
    ]
)

# Create output parser
parser = StrOutputParser()

print("Analyzing YouTube video...")

try:
    response = llm.invoke([message])
    result = parser.invoke(response)

    print("\nAnalysis completed!")
    print("\nResults:\n" + "-" * 40)
    print(result)

except Exception as e:
    print("\nError during video analysis:")
    print(e)
