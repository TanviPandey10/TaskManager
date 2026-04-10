from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

# 1. Task Create karne ke liye schema (User sirf title bhejega)
class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1, description="Task ka title empty nahi hona chahiye")

# 2. Task Update karne ke liye schema (PATCH request ke liye)
class TaskUpdate(BaseModel):
    completed: Optional[bool] = None
    title: Optional[str] = None

# 3. Response ke liye schema (Jo API se data bahar jayega)
class TaskResponse(BaseModel):
    id: str
    title: str
    completed: bool
    createdAt: str

    class Config:
        from_attributes = True