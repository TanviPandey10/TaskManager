 
import { useState } from 'react';

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;  
    
    onAdd(title);
    setTitle('');  
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input 
        type="text" 
        placeholder="Add a new task..." 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: '8px', width: '250px' }}
      />
      <button type="submit" style={{ padding: '8px 15px', marginLeft: '5px' }}>
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;