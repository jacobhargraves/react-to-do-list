import React from 'react';
import { useMutation } from '@apollo/client';

import { DELETE_TODO } from '../../utils/mutations';

const TodoList = ({ todos = [], userId }) => {
  const [deleteTodo, {error}] = useMutation(DELETE_TODO);

  const handleDelete = async (todoId) => {

    try {
      const { data } = await deleteTodo({
        variables: {
          userId,
          todoId,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

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
              <button 
                className='btn btn-sm btn-danger'
                onClick={() => handleDelete(todo._id)}>
                delete
              </button>
            </ul>
          </div>
        ))}
    </div>
  )
};

export default TodoList;