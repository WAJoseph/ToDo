import React, { useState } from 'react';
import { FrappeProvider } from 'frappe-react-sdk'; // Import FrappeProvider
import './App.css'; // Import the CSS file

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    setTodos([...todos, newTodo]);
    setNewTodo('');
  };

  const completeTodo = (index) => {
    setCompletedTodos([...completedTodos, todos[index]]);
    setTodos(todos.filter((_, todoIndex) => todoIndex !== index));
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, todoIndex) => todoIndex !== index));
  };

  const numTodos = todos.length;
  const numCompletedTodos = completedTodos.length;

  return (
    <FrappeProvider> {/* Wrap your application with FrappeProvider */}
      <div className="container">
        <div className="todo-list">
	  <div className="add-task">
            <input
	      className="input-field"
              value={newTodo}
              onChange={e => setNewTodo(e.target.value)}
              placeholder="Add a new task"
            />
	    <button onClick={addTodo}>Add</button>
	  </div>
	  <h2 className="title">Tasks to do - {numTodos}</h2>
          <ul>
            {todos.map((todo, index) => (
              <li key={index} className="todo-item">
                {todo}
		<div>
                  <button onClick={() => completeTodo(index)}>Complete</button>
                  <button onClick={() => removeTodo(index)}>Remove</button>
		</div>
              </li>
            ))}
          </ul>
          <h2 className="title">Done - {numCompletedTodos}</h2>
          <ul>
            {completedTodos.map((todo, index) => (
              <li key={index} className="todo-item">{todo}</li>
            ))}
          </ul>
        </div>
      </div>
    </FrappeProvider>
  );
};

export default TodoApp;

