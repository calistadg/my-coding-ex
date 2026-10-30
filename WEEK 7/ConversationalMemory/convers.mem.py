import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(
    model="gemma-4-26b-a4b-it",
    temperature=0.0,
    api_key=GEMINI_API_KEY
)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant. Answer all questions to the best of your ability."),
    ("human", "{input}")
])

chain = prompt | llm | StrOutputParser()

print("\nStarting chat... Type 'quit' or 'exit' to end the conversation.")
while True:
    user_input = input("You: ")
    if user_input.lower() in ["quit", "exit"]:
        break

    if not user_input.strip():
        print("Please enter a message.")
        continue

    try:
        response = chain.invoke({"input": user_input})
        print(f"AI: {response}")

    except Exception as e:
        print(f"An error ocurred: {e}")

print("\nChat ended.")