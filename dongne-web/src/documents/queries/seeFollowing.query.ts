import { gql } from "@apollo/client";

const SEE_FOLLOWING_QUERY = gql`
  query seeFollowing($username: String!) {
    seeFollowing(username: $username) {
      ok
      error
      following {
        id
        username
        avatar
        isFollowing
        isMe
      }
    }
  }
`;

export default SEE_FOLLOWING_QUERY;
