import os
import requests
from dotenv import load_dotenv
from langchain.tools import tool
from langchain.agents import create_agent
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage


load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is missing from .env file")

llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite",
    google_api_key=GEMINI_API_KEY
)

@tool("currency_exchange", description="Gets the latest available exchange rate between two currencies using the Frankfurter API.")
def currency_exchange(base: str, target: str) -> str:
    """Get the latest available exchange rate for a currency pair."""
    try:
        base = base.upper().strip()
        target = target.upper().strip()

        if not (len(base) == 3 and base.isalpha()
                and len(target) == 3 and target.isalpha()):
            return "Error: Use three-letter currency codes."

        if base == target:
            return f"1 {base} = 1 {target}"

        url = f"https://api.frankfurter.dev/v2/rate/{base}/{target}"

        response = requests.get(url, timeout=10)
        response.raise_for_status()

        data = response.json()

        rate = data["rate"]
        date = data["date"]

        return (
            f"Exchange rate date: {date}\n"
            f"1 {base} = {rate} {target}"
        )

    except requests.RequestException as e:
        return f"API request error: {e}"
    except (KeyError, ValueError) as e:
        return f"Error reading exchange rate: {e}"


tools = [currency_exchange]
agent = create_agent(
    model=llm,
    tools=tools,
    system_prompt=(
        "You are a helpful assistant. "
        "Use the currency_exchange tool when asked about "
        "exchange rates. Report the rate and its date. "
        "Do not invent exchange rates."
    )
)

question = HumanMessage(
    content="What is the current exchange rate from US dollars to Malaysian Ringgit?"
)

response = agent.invoke({"messages": [question]})
final_message = response["messages"][-1]
print("\nAI Agent Response:")
print(final_message.text)
