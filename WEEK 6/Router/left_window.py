from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class LeftWindowAction(BaseModel):
    action: str #Up or Down

left_current_position = []

@router.put("/action")
def operate_left_window(command: LeftWindowAction):
    left_current_position.append(command)
    return {"Result": f"Window moved {command.action}"}

@router.put("/current")
def get_window_status():
    return {"Current_Position": left_current_position}