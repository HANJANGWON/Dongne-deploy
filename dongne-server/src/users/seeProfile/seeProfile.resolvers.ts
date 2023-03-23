import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const resolvers: Resolvers = {
  Query: {
    seeProfile: protectResolver((_, { username }, { prisma }) =>
      prisma.user.findUnique({
        where: {
          username,
        },
        include: {
          following: true,
          followers: true,
        },
      })
    ),
  },
};

export default resolvers;
