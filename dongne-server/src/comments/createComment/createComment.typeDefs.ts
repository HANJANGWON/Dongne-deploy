import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    createComment(postId: Int!, payload: String!): MutationResponse!
  }
`;
