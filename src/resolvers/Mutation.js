const bcrypt = require("bcryptjs");

const hashPassword = require("../utils/hashPassword");
const generateToken = require("../utils/generateToken");
const getUserId = require("../utils/jwt");

module.exports = {
  // Register a new user
  register: async (parent, args, { prisma }, info) => {
    const password = await hashPassword(args.password);

    const user = await prisma.mutation.createUser({
      data: { ...args, password }
    });
    return {
      user,
      token: generateToken(user.id)
    };
  },
  // Login user
  login: async (parent, args, { prisma }, info) => {
    const user = await prisma.query.user({
      where: { email: args.email }
    });

    if (!user) {
      throw new Error("Invalid E-Mail");
    }

    const isMatch = await bcrypt.compare(args.password, user.password);

    if (!isMatch) {
      throw new Error("Invalid Password");
    }

    return {
      user,
      token: generateToken(user.id)
    };
  },
  // Create a company with authenticated user
  createCompany: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request);

    const data = {
      ...args,
      owner: {
        connect: {
          id: userId
        }
      },
      chatroom: {
        create: {
          private: false
        }
      }
    };

    return prisma.mutation.createCompany({ data }, info);
  },
  // Join a chatroom if the user is authenticated
  joinChatRoom: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request);
    const data = {
      participants: {
        connect: {
          id: userId
        }
      }
    };

    return prisma.mutation.updateChatRoom(
      { where: { id: args.chatroomId }, data },
      info
    );
  },
  // Mutation for leaving the chatroom
  leaveChatRoom: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request);
    const data = {
      participants: {
        disconnect: {
          id: userId
        }
      }
    };

    return prisma.mutation.updateChatRoom(
      { where: { id: args.chatroomId }, data },
      info
    );
  },
  // Join a company if user is authenticated
  joinCompany: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request);
    const data = {
      employees: {
        connect: {
          id: userId
        }
      }
    };
    return prisma.mutation.updateCompany(
      { where: { id: args.companyId }, data },
      info
    );
  },
  // Create a message if user is authenticated
  createMessage: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request);
    const data = {
      text: args.text,
      chatroom: {
        connect: {
          id: args.chatroomId
        }
      },
      from: {
        connect: {
          id: userId
        }
      }
    };
    return prisma.mutation.createMessage({ data }, info);
  }
};
