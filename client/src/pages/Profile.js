import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  // checks if data has a me property or that data has a user property. if not, assign undefined
  const user = data?.me || data?.user || {};
  // console.log(user);
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user?.username) {
    return (
      <div className='container'>
        <h3>Log in or sign up to view profile.</h3>
      </div>
    );
  }

  return (
    <div>
      <TodoList todos={user.todos} userId={user._id}/>
      {!userParam && (
      <TodoForm userId={user._id}/>
      )}
    </div>
  );
};

export default Profile;
