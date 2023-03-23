import { gql } from "apollo-server-express";

export default gql`
  type SearchPostsResult {
    ok: Boolean!
    message: String!
    posts: [Post]
  }
  type Query {
    searchPosts(keyword: String!): SearchPostsResult
  }
`;
