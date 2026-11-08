import os
from dotenv import load_dotenv
from langchain.agents import create_agent
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.checkpoint.memory import InMemorySaver
from langchain.agents.middleware import ModelFallbackMiddleware
from langchain_core.messages import HumanMessage

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
primary_llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite",
    api_key=GEMINI_API_KEY
    )

fallback1 = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite",
    api_key=GEMINI_API_KEY
)

fallback2 = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite",
    api_key=GEMINI_API_KEY
)

agent = create_agent(
    model=primary_llm,
    middleware=[
        ModelFallbackMiddleware(
            fallback1,
            fallback2,
        )
    ],
    system_prompt="You are a helpful assistant."
)

response = agent.invoke(
    {"messages": [HumanMessage(content="Hello, how are you?")]}
)
print(response["messages"][-1].text)
print(response["messages"][-1].response_metadata["model_name"])