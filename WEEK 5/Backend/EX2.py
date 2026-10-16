from datetime import date as Date
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="To Do List API")


# Structure of each item
class Item(BaseModel):
    task_id: int
    date: Date
    user: str
    task: str
    priority: int


# Starting dataset
items = [
    Item(
        task_id=456,
        date="2025-05-15",
        user="John",
        task="Learn React",
        priority=5,
    ),
    Item(
        task_id=123,
        date="2025-05-16",
        user="Kelly",
        task="Read a novel",
        priority=3,
    ),
    Item(
        task_id=100,
        date="2025-06-22",
        user="Luke",
        task="Clean living room",
        priority=3,
    ),
    Item(
        task_id=211,
        date="2025-07-12",
        user="John",
        task="Write a blog",
        priority=4,
    ),
]


# Endpoint 1: Return all items
@app.get("/items")
def get_all_items():
    return items


# Endpoint 2: Filter by user (path parameter)
@app.get("/items/{user}")
def get_items_by_user(user: str):
    return [
        item for item in items
        if item.user.lower() == user.lower()
    ]


# Endpoint 3: Filter by date and user (query parameters)
@app.get("/items/")
def get_items_by_date_and_user(date: Date, user: str):
    return [
        item for item in items
        if item.date == date
        and item.user.lower() == user.lower()
    ]


# Endpoint 4: Create an item
@app.post("/items/create_item", status_code=201)
def create_item(new_item: Item):
    for item in items:
        if item.task_id == new_item.task_id:
            raise HTTPException(
                status_code=400,
                detail="Task ID already exists",
            )

    items.append(new_item)
    return {
        "message": "Item created successfully",
        "item": new_item,
    }


# Endpoint 5: Update an item using its task_id
@app.put("/items/update_item")
def update_item(updated_item: Item):
    for index, item in enumerate(items):
        if item.task_id == updated_item.task_id:
            items[index] = updated_item
            return {
                "message": "Item updated successfully",
                "item": updated_item,
            }

    raise HTTPException(
        status_code=404,
        detail="Task ID not found",
    )


# Endpoint 6: Delete an item by task_id
@app.delete("/items/delete_item/{task_id}")
def delete_item(task_id: int):
    for index, item in enumerate(items):
        if item.task_id == task_id:
            deleted_item = items.pop(index)
            return {
                "message": "Item deleted successfully",
                "item": deleted_item,
            }

    raise HTTPException(
        status_code=404,
        detail="Task ID not found",
    )