import { gql } from "@apollo/client";

export const GET_BOUGHT_PRODUCTS = gql`
  #graphql
  query GET_BOUGHT_PRODUCTS($boughtUserId: Int!) {
    getUserBoughtProducts(boughtUserId: $boughtUserId) {
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
        price
        title
        description
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