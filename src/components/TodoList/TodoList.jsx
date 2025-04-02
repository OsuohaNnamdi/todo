import React, { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { TodoItem } from '../TodoItem/TodoItem';
import { Loader } from '../Loader/Loader';
import './TodoList.css';

export const TodoList = () => {
  const { todos, loading } = useContext(TodoContext);

  if (loading) {
    return <Loader />;
  }

  if (todos.length === 0) {
    return <div className="empty-state">No tasks found. Add a new task!</div>;
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};