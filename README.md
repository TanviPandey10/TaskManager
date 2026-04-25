📝 Modern Task Manager (Full-Stack)
A sleek, responsive, and functional Task Management application built with FastAPI (Backend) and React (Frontend). This project was developed as part of a Full-Stack Development Internship assignment.

📺 Project Demo
 https://www.loom.com/share/32c14e4e8de14939a907347b968d2d78
 Features
Core Functionalities
RESTful API: Built with FastAPI for high performance.

Task Management: Create, Read, Update (toggle completion), and Delete tasks.

Modern UI: Minimalist and clean design inspired by modern aesthetics.

Error Handling: Graceful handling of backend connection issues and empty states.

 Bonus Features Implemented
Data Persistence: Tasks are saved in a tasks.json file on the server. Data remains intact even after refreshing the page or restarting the server.

Advanced Filtering: Users can filter tasks by All, Pending, and Completed status.

Responsive Design: Fully functional across different screen sizes.

🛠️ Tech Stack
Frontend: React.js, Vite, CSS3

Backend: Python, FastAPI, Pydantic

Server: Uvicorn (ASGI server)

Storage: JSON-based persistent storage

🚀 Getting Started
Prerequisites
Python 3.8+

Node.js & npm

1. Backend Setup
Bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install fastapi uvicorn pydantic

# Run the server
python -m uvicorn main:app --reload
The backend will run on http://localhost:8000

2. Frontend Setup
Bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
The frontend will run on http://localhost:5174 (or 5173)

📂 Project Structure

TaskManager/
├── backend/
│   ├── main.py          # FastAPI application & routes
│   ├── models.py        # Pydantic data models
│   └── tasks.json       # Persistent data storage (Auto-generated)
├── frontend/
│   ├── src/
│   │   ├── App.jsx      # Main React logic & Filtering
│   │   └── App.css      # Modern styling
│   └── package.json
└── README.md

💡 Technical Decisions
Data Persistence (JSON File Storage): To enhance user experience, I upgraded the storage from volatile in-memory lists to persistent JSON file storage. This ensures that data is preserved even after server restarts or page refreshes.

CORS Configuration: Implemented Cross-Origin Resource Sharing (CORS) middleware in FastAPI to enable secure and seamless communication between the React frontend (running on a different port) and the backend API.

Modular Component Architecture: Optimized the React frontend by breaking down the UI into reusable sub-components (TaskItem, TaskForm). This follows the DRY (Don't Repeat Yourself) principle and improves code maintainability.

State-Driven UI: Utilized React hooks (useState, useEffect) to manage real-time task filtering and loading states, providing a smooth and interactive user interface.
