import bycrypt from "bcryptjs";
import { Resolvers } from "../../types";
import { CreateAccountInput } from "./createAccount.dto";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { username, fullName, email, password }: CreateAccountInput,
      { prisma }
    ) => {
      try {
        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("This username or password is already taken.");
        }

        const uglyPassword = await bycrypt.hash(password, 10);
        await prisma.user.create({
          data: {
            username,
            fullName,
            email,
            password: uglyPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: "Cant create account",
        };
      }
    },
  },
};

export default resolvers;
