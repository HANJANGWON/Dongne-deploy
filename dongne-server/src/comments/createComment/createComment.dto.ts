import { Comment } from "@prisma/client";

export type CreateCommentInput = Pick<Comment, "postId" | "payload">;
