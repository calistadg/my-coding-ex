
from fastapi import FastAPI
from right_window import router as right_router
from left_window import router as left_router

app = FastAPI()

app.include_router(
    right_router,
    prefix="/right",
    tags=["Right Window Buttons"]
)

app.include_router(
    left_router,
    prefix="/left",
    tags=["Left Window Buttons"]
)
