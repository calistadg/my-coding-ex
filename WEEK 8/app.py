
import os
import streamlit as st

from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from langchain_core.output_parsers import StrOutputParser

# Load environment variables
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Page configuration
st.set_page_config(
    page_title="AI YouTube Video Analyzer",
    page_icon="🎬",
    layout="wide"
)

# Custom styling
st.markdown("""
<style>
    .block-container {
        max-width: 1000px;
        padding-top: 2rem;
    }
    h1 {
        color: #169B75;
    }
    .stButton > button {
        background-color: #169B75;
        color: white;
        border-radius: 10px;
        width: 100%;
    }
</style>
""", unsafe_allow_html=True)

# App header
st.title("🎬 AI YouTube Video Analyzer")

st.write(
    "Analyze YouTube videos using Google Gemini AI."
)

st.divider()

# Check API key
if not GEMINI_API_KEY:
    st.error("GEMINI_API_KEY is missing in your .env file.")
    st.stop()

# Initialize Gemini
llm = ChatGoogleGenerativeAI(
    model="gemini-3.8-flash",
    google_api_key=GEMINI_API_KEY
)

parser = StrOutputParser()

# Video URL input
video_url = st.text_input(
    "Enter YouTube Video URL",
    value="https://www.youtube.com/watch?v=L1rR_smhD78",
    placeholder="https://www.youtube.com/watch?v=..."
)

# Analysis options
analysis_type = st.selectbox(
    "Choose Analysis Type",
    [
        "Detailed Video Description",
        "Short Video Summary",
        "Scene-by-Scene Analysis",
        "Key Takeaways"
    ]
)

# Prompts
prompts = {
    "Detailed Video Description":
        "Describe everything happening in this video in detail.",

    "Short Video Summary":
        "Provide a short summary of this video.",

    "Scene-by-Scene Analysis":
        "Analyze this video scene by scene with timestamps.",

    "Key Takeaways":
        "Identify the main points and key takeaways from this video."
}

# Display video preview
if video_url:
    try:
        st.video(video_url)
    except Exception:
        st.warning("Video preview is unavailable.")

st.divider()

# Analyze button
if st.button("✨ Analyze Video"):

    if not video_url.strip():
        st.warning("Please enter a YouTube video URL.")

    elif not (
        video_url.startswith("https://www.youtube.com/")
        or video_url.startswith("https://youtu.be/")
    ):
        st.warning("Please enter a valid YouTube URL.")

    else:
        with st.spinner("Gemini AI is analyzing your video..."):

            try:
                message = HumanMessage(
                    content=[
                        {
                            "type": "text",
                            "text": prompts[analysis_type]
                        },
                        {
                            "type": "media",
                            "file_uri": video_url,
                            "mime_type": "video/mp4"
                        }
                    ]
                )

                response = llm.invoke([message])
                result = parser.invoke(response)

                st.success("Video analysis completed!")

                st.subheader("📋 Analysis Results")

                st.markdown(result)

                st.download_button(
                    label="📥 Download Analysis",
                    data=result,
                    file_name="video_analysis.txt",
                    mime="text/plain"
                )

            except Exception as e:
                st.error("Error during video analysis")
                st.error(str(e))
