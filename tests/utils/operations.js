import { gql } from 'apollo-boost';

export const CREATE_USER = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      name
      email
      id
    }
  }
`;

export const LOGIN = gql`
  mutation($data: LoginUserInput!) {
    loginUser(data: $data) {
      token
    }
  }
`;

export const GET_PROFILE = gql`
  query {
    me {
      id
      name
      email
    }
  }
`;
