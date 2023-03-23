import { gql } from "@apollo/client";
import { FEED_POST } from "../../fragments";

const SEE_POST_QUERY = gql`
  query seePost($id: Int!) {
    seePost(id: $id) {
      ...FeedPost
    }
  }
  ${FEED_POST}
`;

export default SEE_POST_QUERY;
