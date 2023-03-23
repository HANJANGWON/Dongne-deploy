import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    readMessage: protectResolver(
      async (_, { id }, { loggedInUser, prisma }) => {
        const message = await prisma.message.findFirst({
          where: {
            id,
            userId: {
              not: loggedInUser.id,
            },
            room: {
              users: {
                some: {
                  id: loggedInUser.id,
                },
              },
            },
          },
          select: {
            id: true,
          },
        });
        if (!message) {
          return {
            ok: false,
            error: "Message not found",
          };
        }
        await prisma.message.update({
          where: {
            id,
          },
          data: {
            read: true,
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
