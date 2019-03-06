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
  chatRoom: async (parent, args, { prisma }, info) => {
    const chatroom = await prisma.query.chatRooms(
      { where: { company: { id: args.companyId } } },
      info
    );
    if (chatroom === 0) {
      throw new Error("There is no chatroom");
    }

    return chatroom[0];
  }
};
