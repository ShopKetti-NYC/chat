module.exports = {
  message: {
    async subscribe(parent, args, { prisma }, info) {
      return prisma.subscription.message(
        {
          where: { node: { chatroom: { id: args.chatroomId } } }
        },
        info
      );
    }
  }
};
