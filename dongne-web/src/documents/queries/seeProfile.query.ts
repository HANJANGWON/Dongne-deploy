import { gql } from "@apollo/client";
import { POST_FRAGMENT } from "../../fragments";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      username
      fullName
      bio
      avatar
      posts {
        ...PostFragment
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
      isManager
    }
  }
  ${POST_FRAGMENT}
`;

export default SEE_PROFILE_QUERY;
