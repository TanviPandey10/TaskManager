 import { useState, useEffect } from 'react';
import './App.css';

// --- Sub-Components ---
const TaskItem = ({ task, onToggle, onDelete }) => (
  <li className="task-item">
    <input 
      type="checkbox" 
      checked={task.completed} 
      onChange={() => onToggle(task.id, !task.completed)} 
    />
    <span className={task.completed ? 'completed' : ''}>
      {task.title}
    </span>
    <button className="delete-btn" onClick={() => onDelete(task.id)}>
      Delete
    </button>
  </li>
);

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title);
      setTitle('');
    }
  };
  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input 
        type="text" 
        placeholder="Add a new task..." 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <button type="submit" className="add-btn">Add</button>
    </form>
  );
};

// --- Main App Component ---
const API_URL = 'http://localhost:8000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // --- Bonus: Filter State ---
  const [filter, setFilter] = useState('all'); 

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError("Backend se connect nahi ho pa raha. Make sure backend is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false })
      });
      const newTask = await res.json();
      setTasks(prev => [...prev, newTask]);
    } catch (err) { alert("Error adding task"); }
  };

  const toggleTask = async (id, completed) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
      });
      setTasks(prev => prev.map(t => t.id === id ? { ...t, completed } : t));
    } catch (err) { alert("Update failed"); }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) { alert("Delete failed"); }
  };

  useEffect(() => { fetchTasks(); }, []);

  // --- Bonus: Logic to filter tasks ---
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true; // for 'all'
  });

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm onAdd={addTask} />

      {/* --- Bonus: Filter Buttons UI --- */}
      <div className="filter-buttons" style={{ display: 'flex', gap: '5px', marginBottom: '15px', justifyContent: 'center' }}>
        <button onClick={() => setFilter('all')} style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ddd', background: filter === 'all' ? '#6366f1' : '#fff', color: filter === 'all' ? '#fff' : '#000', cursor: 'pointer' }}>All</button>
        <button onClick={() => setFilter('pending')} style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ddd', background: filter === 'pending' ? '#6366f1' : '#fff', color: filter === 'pending' ? '#fff' : '#000', cursor: 'pointer' }}>Pending</button>
        <button onClick={() => setFilter('completed')} style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ddd', background: filter === 'completed' ? '#6366f1' : '#fff', color: filter === 'completed' ? '#fff' : '#000', cursor: 'pointer' }}>Completed</button>
      </div>
      
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      
      <ul className="task-list">
        {filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
        ))}
      </ul>
      
      {!loading && filteredTasks.length === 0 && !error && (
        <p className="empty-msg">No tasks found for "{filter}" filter.</p>
      )}
    </div>
  );
}

export default App;