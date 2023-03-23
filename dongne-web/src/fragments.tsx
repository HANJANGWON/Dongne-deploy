import { gql } from "@apollo/client";

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    user {
      username
      fullName
      avatar
    }
    payload
    isMine
    createdAt
  }
`;

export const POST_FRAGMENT = gql`
  fragment PostFragment on Post {
    id
    file
    likes
    comments {
      ...CommentFragment
    }
    commentsNumber
    isLiked
  }
  ${COMMENT_FRAGMENT}
`;

export const FEED_POST = gql`
  fragment FeedPost on Post {
    ...PostFragment
    user {
      id
      username
      fullName
      avatar
    }
    caption
    createdAt
    isMine
  }
  ${POST_FRAGMENT}
`;
