import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    uploadPost(file: Upload!, caption: String!): Post
  }
`;
