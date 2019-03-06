const { GraphQLServer } = require("graphql-yoga");

const prisma = require("./prisma");
const resolvers = require("./resolvers");

module.exports = new GraphQLServer({
  typeDefs: "src/schema.graphql",
  resolvers,
  context(request) {
    return { prisma, request };
  }
});
