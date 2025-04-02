import React, { createContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const addTodo = (todo) => {
    setTodos([...todos, { 
      id: Date.now(), 
      text: todo.text, 
      completed: false,
      createdAt: new Date().toISOString(),
      priority: todo.priority || 'medium'
    }]);
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, ...updatedTodo } : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'completed' && todo.completed) || 
      (filter === 'active' && !todo.completed);
    
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <TodoContext.Provider value={{
      todos: filteredTodos,
      allTodos: todos,
      loading,
      addTodo,
      updateTodo,
      deleteTodo,
      toggleComplete,
      setFilter,
      setSearchTerm,
      filter,
      searchTerm
    }}>
      {children}
    </TodoContext.Provider>
  );
};