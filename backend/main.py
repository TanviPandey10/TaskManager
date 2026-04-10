from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import Task, TaskUpdate
from typing import List
import json
import os

app = FastAPI(title="Task Manager API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Bonus: Persistence Logic ---
DB_FILE = "tasks.json"

def load_db() -> List[Task]:
    """File se tasks load karta hai (Bonus: Persistence)"""
    if os.path.exists(DB_FILE):
        try:
            with open(DB_FILE, "r") as f:
                data = json.load(f)
                return [Task(**t) for t in data]
        except Exception:
            return []
    return []

def save_db():
    """Tasks ko JSON file mein save karta hai (Bonus: Persistence)"""
    with open(DB_FILE, "w") as f:
        # Pydantic models ko dict mein convert karke save karna
        json.dump([t.model_dump() for t in tasks_db], f, indent=4)

# Global database list
tasks_db: List[Task] = load_db()

@app.get("/tasks", response_model=List[Task])
async def get_tasks():
    return tasks_db

@app.post("/tasks", response_model=Task)
async def create_task(task: Task):
    tasks_db.append(task)
    save_db() # Save changes
    return task

@app.patch("/tasks/{task_id}", response_model=Task)
async def update_task(task_id: str, task_update: TaskUpdate):
    for task in tasks_db:
        if task.id == task_id:
            task.completed = task_update.completed
            save_db() # Save changes
            return task
    raise HTTPException(status_code=404, detail="Task not found")

@app.delete("/tasks/{task_id}")
async def delete_task(task_id: str):
    global tasks_db
    initial_length = len(tasks_db)
    tasks_db = [t for t in tasks_db if t.id != task_id]
    
    if len(tasks_db) == initial_length:
        raise HTTPException(status_code=404, detail="Task not found")
    
    save_db() # Save changes
    return {"message": "Task deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)