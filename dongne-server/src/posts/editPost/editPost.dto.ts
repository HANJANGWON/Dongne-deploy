import { Post } from "@prisma/client";

export type EditPostInput = Pick<Post, "id" | "caption">;
