import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    unfollowUser: protectResolver(
      async (_, { username }, { loggedInUser, prisma }) => {
        const ok = await prisma.user.findUnique({
          where: {
            username,
          },
        });
        if (!ok) {
          return {
            ok: false,
            error: "Can't unfollow user",
          };
        }
        const user = await prisma.user.findUnique({ where: { username } });

        if (user === null) {
          return {
            ok: false,
            error: "존재하지 않는 유저입니다.",
          };
        }
        await prisma.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              disconnect: {
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
