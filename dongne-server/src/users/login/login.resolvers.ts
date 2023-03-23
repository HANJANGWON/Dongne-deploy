import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }, { prisma }) => {
      // find user with args.username
      const user = await prisma.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "아이디 또는 비밀번호를 잘못 입력했습니다.",
        };
      }
      // check password with args.password
      const passwordOk = await bycrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "아이디 또는 비밀번호를 잘못 입력했습니다.",
        };
      }

      // issue a token and send it to user
      const token = await jwt.sign(
        { id: user.id },
        process.env.SECRET_KEY as string
      );
      return {
        ok: true,
        token,
      };
    },
  },
};

export default resolvers;
