import React from 'react';
import { TodoProvider } from './context/TodoContext';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList/TodoList';
import { SearchFilter } from './components/SearchFilter/SearchFilter';
import './App.css';

function App() {

  return (
    <>
      <TodoProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>Donezo</h1>
          <p>Manage your tasks efficiently</p>
        </header>
        <main className="app-main">
          <div className="todo-container">
            <TodoForm />
            <SearchFilter />
            <TodoList />
          </div>
        </main>
        <footer className="app-footer">
          <p></p>
        </footer>
      </div>
    </TodoProvider>
    </>
  )
}

export default App
