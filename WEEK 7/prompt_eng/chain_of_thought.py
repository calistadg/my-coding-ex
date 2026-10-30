import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(
    model="gemini-3.8-flash",
    api_key=GEMINI_API_KEY
)

prompt_template = """
Now, solve this new problem using the same step-by-step approach:
Qustion: {question}
Answwer:
"""
prompt = PromptTemplate(
    input_variables=["question"],
    template=prompt_template
)
chain = prompt | llm | StrOutputParser()

def solve_math_problem(problem):
    try:
        response = chain.invoke({"question": problem})
        print(f"Problem: {problem}\n")
        print(f"Solution: \n{response}\n")
        print("-" * 50 + "\n")
    except Exception as e:
        print(f"An error occured: {str(e)}")

new_problem = """5 people can create 5 donuts every 5 minutes. 
How much time would it take 25 people to make 100 donuts?
Return the answer immediately."""

solve_math_problem(new_problem)