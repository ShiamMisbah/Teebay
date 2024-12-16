import { gql } from "@apollo/client";

export const GET_USER = gql`
  #graphql
  query GET_USERS {
    getUser {
      id
      firstName
      email
      lastName
    }
  }
`;

export const LOGIN_USER = gql`
  #graphql
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      firstName
      email
    }
  }
`;

export const SIGNUP_USER = gql`
  #graphql
  mutation Mutation(
    $firstName: String!
    $lastName: String!
    $address: String!
    $email: String!
    $phoneNumber: String!
    $password: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      address: $address
      email: $email
      phoneNumber: $phoneNumber
      password: $password
    ) {
      email
      firstName
    }
  }
`;