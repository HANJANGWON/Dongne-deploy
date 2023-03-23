import { gql } from "@apollo/client";
import { FEED_POST } from "../../fragments";

const UPLOAD_POST_MUTATION = gql`
  mutation uploadPost($file: Upload!, $caption: String!) {
    uploadPost(file: $file, caption: $caption) {
      ...FeedPost
    }
  }
  ${FEED_POST}
`;

export default UPLOAD_POST_MUTATION;
