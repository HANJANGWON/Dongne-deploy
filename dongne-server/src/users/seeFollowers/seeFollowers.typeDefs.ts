import { gql } from "apollo-server-express";

export default gql`
  type SeeFollowersResult {
    ok: Boolean!
    error: String
    followers: [User]
  }

  type Query {
    seeFollowers(username: String!): SeeFollowersResult!
  }
`;
