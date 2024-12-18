import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import bcrypt from "bcrypt"
import userResolvers from "./modules/resolvers/userResolver.js";
import userTypeDefs from "./modules/typeDefs/userTypeDefs.js";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import productTypeDefs from "./modules/typeDefs/productSchema.js";
import productResolver from "./modules/resolvers/productResolver.js";
import rentProductTypeDefs from "./modules/typeDefs/rentProductSchema.js";
import soldProductResolver from "./modules/resolvers/soldProductResolver.js";
import soldProductTypeDefs from "./modules/typeDefs/soldProductSchema.js";
import rentProductResolver from "./modules/resolvers/rentProductResolver.js";

const typeDefs = mergeTypeDefs([userTypeDefs, productTypeDefs, rentProductTypeDefs, soldProductTypeDefs])
const resolvers = [userResolvers, productResolver, rentProductResolver, soldProductResolver];

const schema = makeExecutableSchema({typeDefs, resolvers})

// Create Apollo Server
const server = new ApolloServer({ schema });
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

