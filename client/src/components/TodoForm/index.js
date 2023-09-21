import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_TODO } from '../../utils/mutations';

import Auth from '../../utils/auth';

const TodoForm = ({ userId }) => {
  const [item, setItem] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addItem, {error}] = useMutation(ADD_TODO);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const { data } = await addItem({
        variables: {
          userId,
          item,
        },
      });

      setItem('');
      setCharacterCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // make sure field is correct and value is less than or equal to 280 char
    if (name === 'item' && value.length <= 280) {
      setItem(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className='card shadow-lg w-50 p-2'>
      <h3>Add a Todo</h3>
      
      {Auth.loggedIn() ? (
      <form
        className=''
        onSubmit={handleFormSubmit}
      >
        <input 
          typeof='text'
          name='item'
          placeholder='Todo item'
          value={item}
          className='form-input w-50'
          onChange={handleChange}
        ></input>
        <p
          className={`m-0 ${
             characterCount === 280 || error ? 'text-danger' : ''
          }`}
        >
          Character Count: {characterCount}/280
          {error && <span className="ms-2">{error.message}</span>}
        </p>
        <div className="col-12 col-lg-3 mt-2">
          <button className="btn btn-sm btn-success" type="submit">
            Add item
          </button>
        </div>
      </form>
      ) : (
        <p>Please login to add Todo items</p>
      )}
    </div>
  )
};

export default TodoForm;