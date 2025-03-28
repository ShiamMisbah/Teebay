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

export const GET_BORROWED_PRODUCTS = gql`
  #graphql
  query GET_BORROWED_PRODUCTS($rentedUserId: Int!) {
    getUserBorrowedProducts(rentedUserId: $rentedUserId) {
      id
      dateEnd
      dateStart
      originalUser {
        email
        firstName
        lastName
      }
      product {
        id
        category
        description
        rent
        rentOption
        title
        productStatus
      }
      rentedUser {
        email
        firstName
        lastName
      }
    }
  }
`;



export const GET_LENT_PRODUCTS = gql`
  #graphql
  query GET_LENT_PRODUCTS($originalUserId: Int!) {
    getUserRentedProducts(originalUserId: $originalUserId) {
      id
      dateEnd
      dateStart
      originalUser {
        email
        firstName
        lastName
      }
      product {
        id
        category
        description
        rent
        rentOption
        title
        productStatus
      }
      rentedUser {
        email
        firstName
        lastName
      }
    }
  }
`;