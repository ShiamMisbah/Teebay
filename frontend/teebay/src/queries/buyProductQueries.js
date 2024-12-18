import { gql } from "@apollo/client";

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