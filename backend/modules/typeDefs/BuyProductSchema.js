const soldProductTypeDefs = `#graphql
  type SoldProduct {
    id: ID!
    dateSold: String!
    productId: Int!
    product: Product!
    originalUserId: Int!
    originalUser: User!
    boughtUserId: Int!
    boughtUser: User!
    createdAt: String!
  }

  type Query {
    getSoldProducts: [SoldProduct!]!
    getSoldProductById(id: Int!): SoldProduct
    getUserSoldPostProducts(originalUserId: Int!): [SoldProduct!]
    getUserSoldProducts(boughtUserId: Int!): [SoldProduct!]
  }

    input AddProductSoldInput {
        dateSold: String!
        productId: Int!
        originalUserId: Int!
        boughtUserId: Int!
    }

  type Mutation {
    createSoldProduct(input: AddProductSoldInput!): SoldProduct
  }
`;

export default soldProductTypeDefs;
