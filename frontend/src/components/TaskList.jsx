 // src/components/TaskList.jsx
import TaskItem from './TaskItem';

const TaskList = ({ tasks, loading, error, onToggle, onDelete }) => {
  // 1. Loading State 
  if (loading) {
    return <p style={{ textAlign: 'center', color: 'blue' }}>Loading tasks...</p>;
  }

  // 2. Error State 
  if (error) {
    return <p style={{ textAlign: 'center', color: 'red' }}>Error: {error}</p>;
  }

  // 3. Empty State [cite: 35]
  if (tasks.length === 0) {
    return <p style={{ textAlign: 'center', color: 'gray' }}>No tasks found. Add your first task above!</p>;
  }

  // 4. Success State (Rendering the list) 
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggle={onToggle} 
          onDelete={onDelete} 
        />
      ))}
    </ul>
  );
};

export default TaskList;