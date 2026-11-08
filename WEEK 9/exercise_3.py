"""Run with: streamlit run app.py"""

import os

import requests
import streamlit as st


# Set FASTAPI_URL in your environment, or change the default below.
API_URL = os.getenv("FASTAPI_URL", "http://127.0.0.1:8000/chat")
WELCOME = (
    "Hello! I am your diabetes care assistant. I can answer questions "
    "based on the medical documents provided. How can I help you today?"
)

st.set_page_config(page_title="Diabetes Care AI", page_icon="💠", layout="wide")

title, reset = st.columns([10, 1])
with title:
    st.title("💠 Diabetes Care AI")
    st.caption("RAG Powered · Diabetes PDF assistant")
with reset:
    if st.button("↻", help="Start a new conversation", use_container_width=True):
        st.session_state.messages = [{"role": "assistant", "content": WELCOME}]
        st.rerun()

st.divider()

if "messages" not in st.session_state:
    st.session_state.messages = [{"role": "assistant", "content": WELCOME}]

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.write(message["content"])

if question := st.chat_input("Ask about diabetes symptoms, treatments, or diet..."):
    st.session_state.messages.append({"role": "user", "content": question})
    with st.chat_message("user"):
        st.write(question)

    with st.chat_message("assistant"):
        try:
            with st.spinner("Looking through the diabetes document…"):
                # Change "question" to "message" if your FastAPI route requires it.
                response = requests.post(
                    API_URL,
                    json={"question": question},
                    timeout=(10, 90),
                )
                response.raise_for_status()
                data = response.json()
                if not isinstance(data, dict):
                    raise ValueError("The API response must be a JSON object.")
                answer = next(
                    (data[key] for key in ("answer", "response", "result")
                     if isinstance(data.get(key), str) and data[key].strip()),
                    None,
                )
                if answer is None:
                    raise ValueError("The API response needs an answer field containing text.")
            st.write(answer)
            st.session_state.messages.append({"role": "assistant", "content": answer})
        except requests.Timeout:
            st.error("The request timed out. Please send your question again.")
        except requests.ConnectionError:
            st.error(f"Cannot connect to FastAPI at {API_URL}. Check that your backend is running.")
        except requests.HTTPError as error:
            st.error(f"FastAPI returned an error (HTTP {error.response.status_code}). Check your backend logs.")
        except (ValueError, requests.RequestException) as error:
            st.error(f"Could not read the answer: {error}")

st.caption("AI answers are based on the provided PDF and may not cover all medical cases.")
