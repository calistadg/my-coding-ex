import logging
import asyncio
import os
from dotenv import load_dotenv
from langchain.agents import create_agent
from langchain.agents.middleware import ModelRetryMiddleware
from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()
from servers import SERVERS

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise SystemExit("GEMINI_API_KEY is missing. Check your .env file.")

llm = ChatGoogleGenerativeAI(
    model="gemini-3.8-flash",
    google_api_key=api_key
)

SYSTEM_PROMPT = (
    "You are a helpful assistant. Use your tools when they fit. "
    "If no tool can do the job, say so. Answer in plain sentences."
)


async def main():
    # Connect to every server and collect their tools
    client = MultiServerMCPClient(SERVERS)
    tools = await client.get_tools()

    print("Tools Available:", [tool.name for tool in tools])

    agent = create_agent(
        model=llm,
        tools=tools,
        system_prompt=SYSTEM_PROMPT,
        middleware=[ModelRetryMiddleware(max_retries=2)]
    )

    question = "Roll two dice, then give me a random number between 1 and 10."

    result = await agent.ainvoke({
        "messages": [
            {"role": "user", "content": question}
        ]
    })

    # Show which tools ran, then the answer
    used = [
        m.name for m in result["messages"]
        if m.type == "tool"
    ]

    print("Tools used:", used)
    print(result["messages"][-1].text)


asyncio.run(main())
