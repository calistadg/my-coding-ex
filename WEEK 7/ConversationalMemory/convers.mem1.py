import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
llm = ChatGoogleGenerativeAI(
    model="gemma-4-26b-a4b-it",
    temperature=0.0,
    api_key=os.getenv("GEMINI_API_KEY")
)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant. Answer all questions to the best of your ability."),
    MessagesPlaceholder(variable_name="history")
    ("human", "{input}"),
])

chain = prompt | llm | StrOutputParser()
history = []

print("\nStarting chat... Type 'quit' or 'exit' to end the conversation.")
while True:
    user_input = input("You: ")
    if user_input.lower() in ["quit", "exit"]:
        break

    if not user_input.strip():
        print("Please enter a message.")
        continue

    try:
        response = chain.invoke({"input": user_input, "history": history})
        history.append(HumanMessage(content=user_input))
        history.append(AIMessage(content=response))
        print(f"AI: {response}")

    except Exception as e:
        print(f"An error ocurred: {e}")

print("\nChat ended.")