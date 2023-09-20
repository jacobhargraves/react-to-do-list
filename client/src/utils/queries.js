import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    
  }
`;

export const QUERY_ME = gql`
  query me {
  }
`;
