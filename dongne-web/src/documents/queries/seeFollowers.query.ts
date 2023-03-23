import { gql } from "@apollo/client";

const SEE_FOLLOWERS_QUERY = gql`
  query seeFollowers($username: String!) {
    seeFollowers(username: $username) {
      ok
      error
      followers {
        id
        username
        avatar
        isFollowing
        isMe
      }
    }
  }
`;

export default SEE_FOLLOWERS_QUERY;
