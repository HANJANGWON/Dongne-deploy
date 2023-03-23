import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    toggleLike: protectResolver(async (_, { id }, { prisma, loggedInUser }) => {
      const post = await prisma.post.findUnique({
        where: {
          id,
        },
      });
      if (!post) {
        return {
          ok: false,
          error: "Post not found",
        };
      }
      const likeWhere = {
        postId_userId: {
          userId: loggedInUser.id,
          postId: id,
        },
      };
      const like = await prisma.like.findUnique({
        where: likeWhere,
      });
      if (like) {
        await prisma.like.delete({
          where: likeWhere,
        });
      } else {
        await prisma.like.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            post: {
              connect: {
                id: post.id,
              },
            },
          },
        });
      }
      return {
        ok: true,
      };
    }),
  },
};

export default resolvers;
