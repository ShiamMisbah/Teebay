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
      user {
        id
        firstName
        lastName
      }
    }
  }
`;

export const GET_PRODUCTS_BY_ID = gql`
  #graphql
  query GET_PRODUCTS_BY_ID($getProductById: Int!) {
    getProductById(id: $getProductById) {
      id
      title
      category
      description
      price
      rent
      rentOption
      productStatus
      userId
      user {
        id
        firstName
        lastName
      }
      createdAt
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
      user {
        id
        firstName
        lastName
      }
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

export const UPDATE_PRODUCTS = gql`
  #graphql
  mutation UpdateProducts($updateProductId: Int!, $input: UpdateProductInput!) {
    updateProduct(id: $updateProductId, input: $input) {
      category
      description
      id
      price
      rent
      rentOption
      title
      updatedAt
    }
  }
`;

export const DELETE_PRODUCTS = gql`
  #graphql
  mutation DeleteProduct($deleteProductId: Int!) {
    deleteProduct(id: $deleteProductId) {
      message
      success
    }
  }
`;