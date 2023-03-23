import { gql } from "@apollo/client";

const ME_QUERY = gql`
  query me {
    me {
      id
      email
      username
      fullName
      avatar
      bio
    }
  }
`;

export default ME_QUERY;
