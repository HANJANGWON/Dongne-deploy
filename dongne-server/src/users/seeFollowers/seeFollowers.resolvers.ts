import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFollowers: async (_, { username }, { prisma }) => {
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
      const followers = await prisma.user
        .findUnique({ where: { username } })
        .followers();
      return {
        ok: true,
        followers,
      };
    },
  },
};

export default resolvers;
