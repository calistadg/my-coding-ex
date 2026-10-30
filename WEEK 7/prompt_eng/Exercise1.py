
import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import FewShotPromptTemplate, PromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

llm = ChatGoogleGenerativeAI(
    model="gemini-3.8-flash",
    api_key=GEMINI_API_KEY
)

# Halal Nadi examples
examples = [
    {
        "feedback": "The halal certification process was fast and easy.",
        "sentiment": "Positive"
    },
    {
        "feedback": "The application process is confusing and takes too long.",
        "sentiment": "Negative"
    },
    {
        "feedback": "I submitted my halal certification documents yesterday.",
        "sentiment": "Neutral"
    },
    {
        "feedback": "The system is helpful but sometimes very slow.",
        "sentiment": "Mixed"
    }
]

example_prompt = PromptTemplate(
    input_variables=["feedback", "sentiment"],
    template="Feedback: {feedback}\nSentiment: {sentiment}"
)

few_shot_prompt = FewShotPromptTemplate(
    examples=examples,
    example_prompt=example_prompt,
    prefix=(
        "Classify the following halal certification feedback "
        "as Positive, Negative, Neutral, or Mixed. "
        "Return only the sentiment label."
    ),
    suffix="Feedback: {feedback}\nSentiment:",
    input_variables=["feedback"]
)

chain = few_shot_prompt | llm | StrOutputParser()

# User enters feedback
feedback = input("Enter halal feedback: ")

# AI analyses sentiment
result = chain.invoke({"feedback": feedback})

print(result.strip())
print("\nProgram ended.")
