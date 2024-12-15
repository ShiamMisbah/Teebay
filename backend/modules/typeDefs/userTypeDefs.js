const userTypeDefs = `#graphql
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    address: String!
    email: String!
    phoneNumber: String!
    password: String!
    createdAt: String!
  }

  type Query {
    getUser: [User]
  }

  type Mutation {
    register(
      firstName: String!, 
      lastName: String!, 
      address: String!, 
      email: String!, 
      phoneNumber: String!, 
      password: String!
    ): User

    login(email: String!, password: String!): User
  }
`;

export default userTypeDefs;