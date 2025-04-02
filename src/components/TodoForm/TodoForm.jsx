import React, { useState, useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import './TodoForm.css';

export const TodoForm = () => {
  const { addTodo } = useContext(TodoContext);
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    addTodo({ text, priority });
    setText('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button type="submit" className="add-button">
        {isEditing ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};