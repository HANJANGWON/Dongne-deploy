import { gql } from "@apollo/client";

const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
      error
      user {
        username
      }
    }
  }
`;

export default UNFOLLOW_USER_MUTATION;
