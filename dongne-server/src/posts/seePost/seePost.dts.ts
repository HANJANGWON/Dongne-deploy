import { Post } from "@prisma/client";

export type SeePostInput = Pick<Post, "id">;
