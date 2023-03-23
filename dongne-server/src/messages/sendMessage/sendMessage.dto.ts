import { Message } from "@prisma/client";

export type SendMessageInput = Pick<Message, "payload" | "roomId" | "userId">;
