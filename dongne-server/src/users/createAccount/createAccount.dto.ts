import { User } from "@prisma/client";

export type CreateAccountInput = Pick<
  User,
  "email" | "fullName" | "username" | "password"
>;
