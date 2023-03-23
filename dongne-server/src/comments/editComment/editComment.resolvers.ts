import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";
import { EditCommentInput } from "./editComment.dto";

const resolvers: Resolvers = {
  Mutation: {
    editComment: protectResolver(
      async (
        _,
        { id, payload }: EditCommentInput,
        { loggedInUser, prisma }
      ) => {
        const comment = await prisma.comment.findUnique({
          where: {
            id,
          },
          select: {
            userId: true,
          },
        });
        if (!comment) {
          return {
            ok: false,
            error: "Comment not found",
          };
        } else if (comment.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "Not authorized.",
          };
        } else {
          await prisma.comment.update({
            where: {
              id,
            },
            data: {
              payload,
            },
          });
          return {
            ok: true,
          };
        }
      }
    ),
  },
};

export default resolvers;
