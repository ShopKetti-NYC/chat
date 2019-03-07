module.exports = {
  users: (parent, args, { prisma }, info) => {
    return prisma.query.users({}, info);
  },
  companies: (parent, args, { prisma }, info) => {
    return prisma.query.companies({}, info);
  },
  chatRooms: (parent, args, { prisma }, info) => {
    return prisma.query.chatRooms({}, info);
  },
  chatRoom: (parent, args, { prisma }, info) => {
    return prisma.query.chatRoom({ where: { id: args.chatroomId } }, info);
  }
};
