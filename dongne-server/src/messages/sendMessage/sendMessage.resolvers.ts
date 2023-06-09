import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";
import { SendMessageInput } from "./sendMessage.dto";

const resolvers: Resolvers = {
  Mutation: {
    sendMessage: protectResolver(
      async (
        _,
        { payload, roomId, userId }: SendMessageInput,
        { loggedInUser, prisma }
      ) => {
        let room: any = null;
        if (userId) {
          const user = await prisma.user.findUnique({
            where: {
              id: userId,
            },
            select: {
              id: true,
            },
          });
          if (!user) {
            return {
              ok: false,
              error: "This user does not exist.",
            };
          }
          room = await prisma.room.create({
            data: {
              users: {
                connect: [
                  {
                    id: userId,
                  },
                  {
                    id: loggedInUser.id,
                  },
                ],
              },
            },
          });
        } else if (roomId) {
          room = await prisma.room.findUnique({
            where: {
              id: roomId,
            },
            select: {
              id: true,
            },
          });
          if (!room) {
            return {
              ok: false,
              error: "Room not found.",
            };
          }
        }
        const message = await prisma.message.create({
          data: {
            payload,
            room: {
              connect: {
                id: room.id,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });
        pubsub.publish(NEW_MESSAGE, { roomUpdates: { ...message } });

        return {
          ok: true,
          id: message.id,
        };
      }
    ),
  },
};

export default resolvers;
