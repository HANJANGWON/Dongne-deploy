import { Comment } from "@prisma/client";

export type EditCommentInput = Pick<Comment, "id" | "payload">;
