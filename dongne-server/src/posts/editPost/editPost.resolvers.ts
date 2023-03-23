import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";
import { processDongtags } from "../posts.utils";
import { EditPostInput } from "./editPost.dto";

const resolvers: Resolvers = {
  Mutation: {
    editPost: protectResolver(
      async (_, { id, caption }: EditPostInput, { loggedInUser, prisma }) => {
        const oldPost = await prisma.post.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            dongtags: {
              select: {
                dongtag: true,
              },
            },
          },
        });
        if (!oldPost) {
          return {
            ok: false,
            error: "Post not found.",
          };
        }
        await prisma.post.update({
          where: {
            id,
          },
          data: {
            caption,
            dongtags: {
              disconnect: oldPost.dongtags,
              connectOrCreate: processDongtags(caption),
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
