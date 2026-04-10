 # database.py
from typing import List
from models import Task

# Shared storage across files
tasks_db: List[Task] = []