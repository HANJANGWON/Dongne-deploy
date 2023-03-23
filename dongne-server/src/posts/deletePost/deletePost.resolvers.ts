import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    deletePost: protectResolver(async (_, { id }, { loggedInUser, prisma }) => {
      const post = await prisma.post.findUnique({
        where: {
          id,
        },
        select: {
          userId: true,
        },
      });
      if (!post) {
        return {
          ok: false,
          error: "Post not found",
        };
      } else if (post.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "Not authorized.",
        };
      } else {
        await prisma.post.delete({
          where: {
            id,
          },
        });
        return {
          ok: true,
        };
      }
    }),
  },
};

export default resolvers;
