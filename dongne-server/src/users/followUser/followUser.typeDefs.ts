import { gql } from "apollo-server-express";

export default gql`
  type FollowUserMutation {
    ok: Boolean!
    error: String
    user: User
  }
  type Mutation {
    followUser(username: String): FollowUserMutation!
  }
`;
