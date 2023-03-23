import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePostLikes: async (_, { id }, { prisma }) => {
      const likes = await prisma.like.findMany({
        where: {
          postId: id,
        },
        select: {
          user: true,
        },
      });
      return likes.map((like) => like.user);
    },
  },
};

export default resolvers;
