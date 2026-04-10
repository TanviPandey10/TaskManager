  
const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <li style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '10px', 
      padding: '8px', 
      borderBottom: '1px solid #ddd' 
    }}>
      {/* Checkbox for Completion [cite: 14, 27] */}
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => onToggle(task.id, !task.completed)} 
      />
      
      {/* Task Title with Strike-through if completed [cite: 25, 27] */}
      <span style={{ 
        flex: 1, 
        textDecoration: task.completed ? 'line-through' : 'none',
        color: task.completed ? 'gray' : 'black'
      }}>
        {task.title}
      </span>

      {/* Delete Button [cite: 15, 23] */}
      <button 
        onClick={() => onDelete(task.id)}
        style={{ color: 'red', cursor: 'pointer' }}
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;