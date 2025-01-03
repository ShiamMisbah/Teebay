const rentProductTypeDefs = `#graphql
  type RentedProduct {
    id: ID!
    dateStart: String!
    dateEnd: String!
    productId: Int!
    product: Product!
    originalUserId: Int!
    originalUser: User!
    rentedUserId: Int!
    rentedUser: User!
    createdAt: String!
  }

  type Query {
    getUserRentedProducts(originalUserId: Int!): [RentedProduct!]
    getUserBorrowedProducts(rentedUserId: Int!): [RentedProduct!]
  }

    input AddProductRentInput {
        dateStart: String!
        dateEnd: String!
        productId: Int!
        originalUserId: Int!
        rentedUserId: Int!
    }

  type Mutation {
    createRentedProduct(input: AddProductRentInput!): RentedProduct
  }
`;

export default rentProductTypeDefs;
