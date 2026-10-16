from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class RightWindowAction(BaseModel):
    action: str #Up or Down

right_current_position = []

@router.put("/action")
def operate_right_window(command: RightWindowAction):
    right_current_position.append(command)
    return {"Result": f"Window moved {command.action}"}

@router.put("/current")
def get_window_status():
    return {"Current_Position": right_current_position}