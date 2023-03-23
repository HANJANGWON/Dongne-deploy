import { Resolvers } from "../../types";
import { SeePostInput } from "./seePost.dts";

const resolvers: Resolvers = {
  Query: {
    seePost: (_, { id }: SeePostInput, { prisma }) =>
      prisma.post.findUnique({
        where: {
          id,
        },
      }),
  },
};

export default resolvers;
