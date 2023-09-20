import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password){
      token
      user {
          _id
          username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!){
    addUser(username: $username, email: $email, password: $password){
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_TODO = gql`
  mutation addTodo ($userId: ID!, $item: String!){
    addTodo (userId: $userId, item: $item){
      _id
      username
      email
      todos {
        _id
        item
        completed
        createdAt
      }
    }
  }
`;

// code to delete todo item