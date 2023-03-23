import prisma from "../client";
import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Room: {
    users: ({ id }) => prisma.room.findUnique({ where: { id } }).users(),
    messages: ({ id }) =>
      prisma.message.findMany({
        where: {
          roomId: id,
        },
      }),
    unreadTotal: ({ id }, __, { loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }
      return prisma.message.count({
        where: {
          read: false,
          roomId: id,
          user: {
            id: {
              not: loggedInUser.id,
            },
          },
        },
      });
    },
  },
  Message: {
    user: ({ id }) => prisma.message.findUnique({ where: { id } }).user(),
  },
};

export default resolvers;
