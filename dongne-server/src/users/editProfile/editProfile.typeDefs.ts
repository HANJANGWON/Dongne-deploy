import { gql } from "apollo-server";

export default gql`
  scalar Upload

  type Mutation {
    editProfile(
      fullName: String
      username: String
      email: String
      password: String
      bio: String
      avatar: Upload
    ): MutationResponse!
  }
`;
