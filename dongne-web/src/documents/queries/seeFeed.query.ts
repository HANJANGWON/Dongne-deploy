import { gql } from "@apollo/client";
import { COMMENT_FRAGMENT, POST_FRAGMENT } from "../../fragments";

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PostFragment
      user {
        username
        fullName
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${POST_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export default FEED_QUERY;
