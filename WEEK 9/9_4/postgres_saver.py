import os
from dotenv import load_dotenv
from langchain.agents import create_agent
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.checkpoint.postgres import PostgresSaver
from langgraph.checkpoint.memory import InMemorySaver
from langchain_core.messages import HumanMessage

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
DB_URI = os.getenv("DATABASE_URL")
llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite",
    api_key=GEMINI_API_KEY
    )

with PostgresSaver.from_conn_string(DB_URI) as checkpointer:
    checkpointer.setup()

    agent = create_agent(
        model=llm,
        checkpointer=checkpointer
    )

    config = {"configurable": {"thread_id": "1"}}

    response = agent.invoke({"message": [HumanMessage(content="Hi! My name is Calista.")]}, config)
    print(response["message"][-1].text)