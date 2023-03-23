import { gql } from "apollo-server-express";

export default gql`
  type Post {
    id: Int!
    user: User!
    file: String!
    caption: String!
    dongtags: [Dongtag]
    likes: Int!
    commentsNumber: Int!
    comments: [Comment]
    createdAt: String!
    updatedAt: String!
    isMine: Boolean!
    isLiked: Boolean!
  }

  type Dongtag {
    id: Int!
    dongtag: String!
    posts(page: Int!): [Post]
    totalPosts: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Like {
    id: Int!
    post: Post
    createdAt: String!
    updatedAt: String!
  }
`;
