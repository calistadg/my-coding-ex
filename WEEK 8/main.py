import os
import base64

from fastapi import FastAPI, File, UploadFile, HTTPException
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv
from typing import Dict

load_dotenv()

llm = ChatGoogleGenerativeAI(
    model="gemini-3.8-flash",
    api_key=os.getenv("GEMINI_API_KEY")
)

app = FastAPI()

def encode_image(image_content: bytes) -> str:
    return base64.b64encode(image_content).decode()

@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)) -> Dict[str, str]:
    if not file.content_type or file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Invalid or missing file type. Only JPEG and PNG are allowed.")
    
    contents = await file.read()
    
    if len(contents) > 10_000_000:
        raise HTTPException(status_code=400, detail="File too large. Maximum size is 10MB.")
        
    image = encode_image(contents)

    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a nutrition expert capable of analyzing food images and providing detailed nutritional advice."),
        ("human", [
            {
                "type": "text",
                "text": """Analyze the image and provide a comprehensive nutritional breakdown and health advice. Follow these steps:

1. Food Identification:
   - Identify the food or dish.
   - List the visible ingredients.

2. Nutritional Information:
   - Estimate total calories (kcal).
   - Estimate protein content (g).
   - Estimate carbohydrate content (g).
   - Estimate fat content (g).
   - Estimate fiber content (g).

3. Health Benefits:
   - Explain possible nutritional benefits.
   - Identify relevant vitamins and minerals.

4. Health Concerns:
   - Identify possible high sugar, salt, or fat content.
   - Explain potential health concerns.

5. Healthy Recommendations:
   - Suggest healthier food alternatives.
   - Recommend appropriate portion sizes.
   - Suggest ways to improve the meal.

6. Overall Summary:
   - Provide a short nutritional summary.
   - Give an overall health recommendation.

Important:
   - Nutritional values are estimates only.
   - State assumptions about portion sizes.
   - Do not invent ingredients as confirmed facts.
   - If the image does not contain food, say so."""
            },
            {
                "type": "image_url",
                "image_url": {
                    "url": f"data:{file.content_type};base64,{image}"
                }
            }
        ])
    ])

    try:
        chain = prompt | llm | StrOutputParser()
        res = await chain.ainvoke({})
    except Exception as e:
        
        raise HTTPException(status_code=500, detail=str(e))
        
    return {"analysis": res}