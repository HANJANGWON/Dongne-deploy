import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    followUser: protectResolver(
      async (_, { username }, { loggedInUser, prisma }) => {
        const ok = await prisma.user.findUnique({
          where: {
            username,
          },
        });
        if (!ok) {
          return {
            ok: false,
            error: "That user does not exist",
          };
        }
        const user = await prisma.user.findUnique({ where: { username } });
        if (user === null) {
          return {
            ok: false,
            error: "유저가 존재하지 않습니다.",
          };
        }
        await prisma.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              connect: {
                username,
              },
            },
          },
        });
        return {
          ok: true,
          error: "성공",
          user,
        };
      }
    ),
  },
};

export default resolvers;
