import { gql } from "@apollo/client";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $fullName: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      username: $username
      fullName: $fullName
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

export default CREATE_ACCOUNT_MUTATION;
