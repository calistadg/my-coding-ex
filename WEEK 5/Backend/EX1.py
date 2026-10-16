from datetime import date
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()


# Structure of a task
class Task(BaseModel):
    task_id: int
    date: date
    user: str
    task: str
    priority: int


# Starting dataset from your exercise
tasks = [
    Task(
        task_id=456,
        date="2025-05-15",
        user="John",
        task="Learn React",
        priority=5,
    ),
    Task(
        task_id=123,
        date="2025-05-16",
        user="Kelly",
        task="Read a novel",
        priority=3,
    ),
    Task(
        task_id=100,
        date="2025-06-22",
        user="Luke",
        task="Clean living room",
        priority=3,
    ),
    Task(
        task_id=211,
        date="2025-07-12",
        user="John",
        task="Write a blog",
        priority=4,
    ),
]


@app.get("/")
def home():
    return {"message": "To-do API is running"}


# READ all tasks
@app.get("/tasks")
def read_tasks():
    return tasks


# READ one task
@app.get("/tasks/{task_id}")
def read_task(task_id: int):
    for item in tasks:
        if item.task_id == task_id:
            return item

    raise HTTPException(status_code=404, detail="Task not found")


# CREATE a task
@app.post("/tasks", status_code=201)
def create_task(new_task: Task):
    for item in tasks:
        if item.task_id == new_task.task_id:
            raise HTTPException(
                status_code=409,
                detail="Task ID already exists",
            )

    tasks.append(new_task)
    return new_task


# UPDATE a task (replace all its fields)
@app.put("/tasks/{task_id}")
def update_task(task_id: int, updated_task: Task):
    if updated_task.task_id != task_id:
        raise HTTPException(
            status_code=400,
            detail="Body task_id must match the URL task_id",
        )

    for index, item in enumerate(tasks):
        if item.task_id == task_id:
            tasks[index] = updated_task
            return updated_task

    raise HTTPException(status_code=404, detail="Task not found")


# DELETE a task
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    for index, item in enumerate(tasks):
        if item.task_id == task_id:
            tasks.pop(index)
            return {"message": f"Task {task_id} deleted successfully"}

    raise HTTPException(status_code=404, detail="Task not found")