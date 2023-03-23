import { gql } from "@apollo/client";

const DELETE_POST_MUTATION = gql`
  mutation deletePost($id: Int!) {
    deletePost(id: $id) {
      ok
    }
  }
`;

export default DELETE_POST_MUTATION;
