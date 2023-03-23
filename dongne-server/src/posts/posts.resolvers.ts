import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Post: {
    user: ({ userId }, _, { prisma }) =>
      prisma.user.findUnique({ where: { id: userId } }),
    dongtags: ({ id }, _, { prisma }) =>
      prisma.dongtag.findMany({
        where: {
          posts: {
            some: {
              id,
            },
          },
        },
      }),
    likes: ({ id }, _, { prisma }) =>
      prisma.like.count({ where: { postId: id } }),
    commentsNumber: ({ id }, _, { prisma }) =>
      prisma.comment.count({ where: { postId: id } }),
    comments: ({ id }, _, { prisma }) =>
      prisma.comment.findMany({
        where: { postId: id },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      }),
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
    isLiked: async ({ id }, _, { prisma, loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const ok = await prisma.like.findUnique({
        where: {
          postId_userId: {
            postId: id,
            userId: loggedInUser.id,
          },
        },
        select: {
          id: true,
        },
      });
      if (ok) {
        return true;
      }
      return false;
    },
  },
  Dongtag: {
    posts: ({ id }, { page }, { prisma, loggedInUser }) => {
      return prisma.dongtag
        .findUnique({
          where: {
            id,
          },
        })
        .posts({
          take: 5,
          skip: (page - 1) * 5,
        });
    },
    totalPosts: ({ id }, _, { prisma }) =>
      prisma.post.count({
        where: {
          dongtags: {
            some: {
              id,
            },
          },
        },
      }),
  },
};

export default resolvers;
