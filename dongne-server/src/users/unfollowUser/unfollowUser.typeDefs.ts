import { gql } from "apollo-server-express";

export default gql`
  type UnfollowUserMutation {
    ok: Boolean!
    error: String
    user: User
  }
  type Mutation {
    unfollowUser(username: String!): UnfollowUserMutation!
  }
`;
