import os 
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-3.8-flash", api_key=GEMINI_API_KEY)

message = [
    (
        "system",
        "You are a helpful assistant that translated English to German. Translate the provided sentence only."
    ),
    (
        "human",
        "I like eating."
    ),
]

chain = llm | StrOutputParser()
ai_msg = chain.invoke(message)
print(ai_msg)