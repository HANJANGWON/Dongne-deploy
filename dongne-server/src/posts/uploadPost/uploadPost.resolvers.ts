import { uploadToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";
import { processDongtags } from "../posts.utils";
import { UploadPostInput } from "./uploadPost.dto";

const resolvers: Resolvers = {
  Mutation: {
    uploadPost: protectResolver(
      async (
        _,
        { file, caption }: UploadPostInput,
        { loggedInUser, prisma }
      ) => {
        let dongtagObj: any = [];

        dongtagObj = processDongtags(caption);
        const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
        return prisma.post.create({
          data: {
            file: fileUrl,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(dongtagObj.length > 0 && {
              dongtags: {
                connectOrCreate: dongtagObj,
              },
            }),
          },
        });
      }
    ),
  },
};

export default resolvers;
