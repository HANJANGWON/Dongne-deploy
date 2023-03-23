import { Post } from "@prisma/client";

export type UploadPostInput = Pick<Post, "file" | "caption">;
