import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFollowing: async (_, { username }, { prisma }) => {
      const ok = await prisma.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      const following = await prisma.user
        .findUnique({ where: { username } })
        .following();
      return {
        ok: true,
        following,
      };
    },
  },
};

export default resolvers;
