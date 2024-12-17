const productTypeDefs = `#graphql
    enum ProductStatus {
        POSTED
        SOLD
        RENTED
    }

    enum RentOption {
        HOURLY
        DAILY
        WEEKLY
        MONTHLY
        YEARLY
    }

    type Message{
        success: Boolean
        message: String
    }

    type Product {
        id: Int!
        title: String!
        category: [String!]!
        description: String!
        price: Int!
        rent: Int!
        rentOption: RentOption!
        productStatus: ProductStatus!
        userId: Int!
        user: User!
        # productRented: [RentedProduct!]
        # productSold: [SoldProduct!]
        createdAt: String!
        updatedAt: String!
    }

    input AddProductInput {
        title: String!
        category: [String!]!
        description: String!
        price: Int!
        rent: Int!
        rentOption: RentOption!
        userId: Int!
    }

    input UpdateProductInput {
        title: String
        category: [String!]
        description: String
        price: Int
        rent: Int
        rentOption: RentOption
    }

    type Query {
        getProducts: [Product!]
        getProductById(id: Int!): Product
        getUserProducts(userID: Int!): [Product!]
    }

    type Mutation {
        addProduct(input: AddProductInput!): Product!
        updateProduct(id: Int!, input: UpdateProductInput!): Product!
        deleteProduct(id: Int!): Message!
    }
`;

export default productTypeDefs