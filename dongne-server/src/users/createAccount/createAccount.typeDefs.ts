import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createAccount(
      username: String!
      fullName: String!
      email: String!
      password: String!
      isManager: Boolean
    ): MutationResponse!
  }
`;
