import { gql } from "@apollo/client";

export const CREATE_RENT_PRODUCTS = gql`
  #graphql
  mutation createRentProduct($input: AddProductRentInput!) {
    createRentedProduct(input: $input) {
      originalUser {
        firstName
        id
      }
      rentedUser {
        firstName
        id
      }
      product {
        id
        title
      }
      dateEnd
      dateStart
    }
  }
`;