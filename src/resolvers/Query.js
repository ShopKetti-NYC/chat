module.exports = {
  users: (parent, args, { prisma }, info) => {
    return prisma.query.users({}, info);
  },
  companies: (parent, args, { prisma }, info) => {
    return prisma.query.companies({}, info);
  }
};
