from pydantic import BaseModel, Field
from typing import Optional
import uuid
from datetime import datetime

class Task(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str = Field(..., min_length=1)
    completed: bool = False
    createdAt: str = Field(default_factory=lambda: datetime.now().isoformat())

class TaskUpdate(BaseModel):
    completed: bool