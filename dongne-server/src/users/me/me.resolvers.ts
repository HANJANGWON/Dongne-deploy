import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const resolvers: Resolvers = {
  Query: {
    me: protectResolver((_, __, { loggedInUser, prisma }) =>
      prisma.user.findUnique({
        where: {
          id: loggedInUser.id,
        },
      })
    ),
  },
};

export default resolvers;
