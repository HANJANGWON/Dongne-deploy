import { gql } from "@apollo/client";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($postId: Int!, $payload: String!) {
    createComment(postId: $postId, payload: $payload) {
      ok
      error
      id
    }
  }
`;

export default CREATE_COMMENT_MUTATION;
