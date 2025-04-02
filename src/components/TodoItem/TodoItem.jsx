import React, { useState, useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import './TodoItem.css';

export const TodoItem = ({ todo }) => {
  const { updateTodo, deleteTodo, toggleComplete } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateTodo(todo.id, { text: editText, priority: editPriority });
    setIsEditing(false);
  };

  const priorityClass = `priority-${todo.priority}`;

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <form onSubmit={handleUpdate} className="edit-form">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
            className="edit-priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button type="submit" className="save-button">Save</button>
          <button 
            type="button" 
            onClick={() => setIsEditing(false)} 
            className="cancel-button"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="todo-content">
          <div className="todo-info">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
              className="todo-checkbox"
            />
            <span className={`todo-text ${priorityClass}`}>{todo.text}</span>
            <span className="todo-date" style={{marginRight :"20px"}}>
              {new Date(todo.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="todo-actions">
            <button 
              onClick={() => setIsEditing(true)} 
              className="edit-button"
            >
              Edit
            </button>
            <button 
              onClick={() => deleteTodo(todo.id)} 
              className="delete-button"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
};