import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  #graphql
  query GET_ALL_PRODUCTS {
    getProducts {
      category
      createdAt
      description
      id
      price
      productStatus
      rent
      rentOption
      title
    }
  }
`;

export const GET_MY_PRODUCTS = gql`
  #graphql
  query GET_MY_PRODUCTS($userId: Int!) {
    getUserProducts(userID: $userId) {
      category
      createdAt
      description
      id
      price
      productStatus
      rent
      rentOption
      title
    }
  }
`;

export const ADD_PRODUCTS = gql`
  #graphql
  mutation AddProduct($input: AddProductInput!) {
    addProduct(input: $input) {
      id
      title
      createdAt
    }
  }
`;