import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchPosts: async (_, { keyword }, { prisma }) => {
      const foundPosts = await prisma.post.findMany({
        where: {
          caption: {
            contains: keyword,
          },
        },
      });
      if (foundPosts.length) {
        return { ok: true, message: "Post 검색 성공", posts: foundPosts };
      } else {
        return { ok: false, message: "검색 결과 없음", posts: foundPosts };
      }
    },
  },
};

export default resolvers;
