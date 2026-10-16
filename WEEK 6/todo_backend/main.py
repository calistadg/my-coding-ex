
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from typing import Annotated

import models
from models import Todo
from database import engine, SessionLocal

app = FastAPI(title="To-Do List API")

# Create database tables
models.Base.metadata.create_all(bind=engine)


# Database connection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


# Request model
class TodoRequest(BaseModel):
    title: str = Field(min_length=3, max_length=100)
    description: str = ""
    completed: bool = False


# READ all tasks
@app.get("/todos")
async def read_all(db: db_dependency):
    return db.query(Todo).all()


# READ one task
@app.get("/todos/{todo_id}")
async def get_todo_by_id(todo_id: int, db: db_dependency):
    todo = db.query(Todo).filter(Todo.id == todo_id).first()

    if todo is None:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return todo


# CREATE a task
@app.post("/todos")
async def create_todo(todo_request: TodoRequest, db: db_dependency):
    new_todo = Todo(
        title=todo_request.title,
        description=todo_request.description,
        completed=todo_request.completed
    )

    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)

    return {"message": "Task successfully added"}


# UPDATE a task
@app.put("/todos/{todo_id}")
async def update_todo(
    todo_id: int,
    todo_request: TodoRequest,
    db: db_dependency
):
    todo = db.query(Todo).filter(Todo.id == todo_id).first()

    if todo is None:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    todo.title = todo_request.title
    todo.description = todo_request.description
    todo.completed = todo_request.completed

    db.commit()

    return {"message": "Task successfully updated"}


# DELETE a task
@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: int, db: db_dependency):
    todo = db.query(Todo).filter(Todo.id == todo_id).first()

    if todo is None:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    db.delete(todo)
    db.commit()

    return {"message": "Task successfully deleted"}
