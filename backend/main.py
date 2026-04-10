from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import Task, TaskUpdate
from typing import List

app = FastAPI(title="Task Manager API")

 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage (As per Technical Notes) [cite: 31]
tasks_db: List[Task] = []

@app.get("/tasks", response_model=List[Task])
async def get_tasks():
    # Return all tasks [cite: 23]
    return tasks_db

@app.post("/tasks", response_model=Task)
async def create_task(task: Task):
    # Create a new task [cite: 23]
    tasks_db.append(task)
    return task

@app.patch("/tasks/{task_id}", response_model=Task)
async def update_task(task_id: str, task_update: TaskUpdate):
    # Update a task status [cite: 23]
    for task in tasks_db:
        if task.id == task_id:
            task.completed = task_update.completed
            return task
    raise HTTPException(status_code=404, detail="Task not found")

@app.delete("/tasks/{task_id}")
async def delete_task(task_id: str):
    # Delete a task [cite: 23]
    global tasks_db
    initial_length = len(tasks_db)
    tasks_db = [t for t in tasks_db if t.id != task_id]
    
    if len(tasks_db) == initial_length:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return {"message": "Task deleted successfully"} # Clear JSON response [cite: 20]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)