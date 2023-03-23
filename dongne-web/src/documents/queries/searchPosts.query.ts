import { gql } from "@apollo/client";
import { COMMENT_FRAGMENT, POST_FRAGMENT } from "../../fragments";

const SEARCH_POSTS = gql`
  query searchPosts($keyword: String!) {
    searchPosts(keyword: $keyword) {
      ok
      message
      posts {
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
  }
  ${POST_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export default SEARCH_POSTS;
