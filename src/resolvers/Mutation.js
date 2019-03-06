const bcrypt = require("bcryptjs");

const hashPassword = require("../utils/hashPassword");
const generateToken = require("../utils/generateToken");
const getUserId = require("../utils/jwt");

module.exports = {
  // Register a new user
  register: async (parent, args, { prisma }, info) => {
    const password = await hashPassword(args.data.password);

    const user = await prisma.mutation.createUser({
      data: { ...args.data, password }
    });
    return {
      user,
      token: generateToken(user.id)
    };
  },
  // Login user
  login: async (parent, args, { prisma }, info) => {
    const user = await prisma.query.user({
      where: { email: args.data.email }
    });

    if (!user) {
      throw new Error("Invalid E-Mail");
    }

    const isMatch = await bcrypt.compare(args.data.password, user.password);

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
      ...args.data,
      owner: {
        connect: {
          id: userId
        }
      }
    };

    return prisma.mutation.createCompany({ data }, info);
  },
  // Create a chatroom in company if you identified as a owner of the company
  createChatRoom: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request);
    const company = await prisma.query.companies({
      where: { owner: { id: userId } }
    });
    if (company.length === 0) {
      throw new Error("Error, You're not the authorized user");
    }
    const data = {
      company: {
        connect: {
          id: company[0].id
        }
      }
    };
    return prisma.mutation.createChatRoom({ data }, info);
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
