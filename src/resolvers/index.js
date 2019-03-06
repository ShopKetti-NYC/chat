const { extractFragmentReplacements } = require("prisma-binding");

const Subscription = require("./Subscription");
const Query = require("./Query");
const Mutation = require("./Mutation");

const resolvers = { Query, Mutation, Subscription };

const fragmentReplacements = extractFragmentReplacements(resolvers);

module.exports = { resolvers, fragmentReplacements };
