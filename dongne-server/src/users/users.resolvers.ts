import { Resolvers } from "../types";

const resolvers: Resolvers = {
  User: {
    totalFollowing: ({ id }, _, { prisma }) =>
      prisma.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }, _, { prisma }) =>
      prisma.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser, prisma }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await prisma.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exists);
    },
    posts: ({ id }, _, { prisma }) =>
      prisma.user.findUnique({ where: { id } }).posts({
        orderBy: {
          createdAt: "desc",
        },
      }),
  },
};

export default resolvers;
