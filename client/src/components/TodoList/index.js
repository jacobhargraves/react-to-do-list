import React from 'react';

const TodoList = ({ todos = [] }) => {
  if (!todos.length) {
    return <h3>No Todos Yet</h3>
  }

  return (
    <div className="container">
      <h3>Todo Items</h3>
      {todos && 
        todos.map((todo) => (
          <div key={todo._id}>
            <ul>
              <li>
                {todo.item}
              </li>
            </ul>
          </div>
        ))}
    </div>
  )
};

export default TodoList;