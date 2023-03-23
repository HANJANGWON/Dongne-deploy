import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    fullName: String!
    createdAt: String!
    updatedAt: String!
    bio: String
    avatar: String
    posts: [Post]
    following: [User]
    followers: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    isManager: Boolean
  }
`;
