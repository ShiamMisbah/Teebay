import { gql } from "@apollo/client";

export const GET_BOUGHT_PRODUCTS = gql`
  #graphql
  query GET_BOUGHT_PRODUCTS($boughtUserId: Int!) {
    getUserBoughtProducts(boughtUserId: $boughtUserId) {
      dateSold
      id
      boughtUser {
        firstName
        lastName
        email
      }
      id
      originalUser {
        firstName
        email
        lastName
      }
      product {
        id
        price
        description
        title
        category
        productStatus
      }
    }
  }
`;

export const GET_SOLD_PRODUCTS = gql`
  #graphql
  query GET_SOLD_PRODUCTS($originalUserId: Int!) {
    getUserSoldProducts(originalUserId: $originalUserId) {
      dateSold
      id
      boughtUser {
        firstName
        lastName
        email
      }
      id
      originalUser {
        firstName
        email
        lastName
      }
      product {
        id
        price
        description
        title
        category
        productStatus
      }
    }
  }
`;

export const CREATE_SOLD_PRODUCTS = gql`
  #graphql
  mutation createSoldProduct($input: AddProductSoldInput!) {
    createSoldProduct(input: $input) {
      boughtUser {
        firstName
        id
      }
      originalUser {
        firstName
        id
      }
      id
      product {
        id
        title
      }
    }
  }
`;