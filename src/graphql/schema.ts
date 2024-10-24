import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { userTypeDefs, authTypeDefs } from "./typeDefs";
import { userResolvers, authResolvers } from "./resolvers";

const typeDefs = mergeTypeDefs([userTypeDefs, authTypeDefs]);
const resolvers = mergeResolvers([userResolvers, authResolvers]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
