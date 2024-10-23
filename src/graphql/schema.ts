import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { userTypeDefs } from "./typeDefs";
import { userResolvers } from "./resolvers";

const typeDefs = mergeTypeDefs([userTypeDefs]);
const resolvers = mergeResolvers([userResolvers]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
