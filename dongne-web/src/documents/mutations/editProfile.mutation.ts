import { gql } from "@apollo/client";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile(
    $fullName: String
    $username: String
    $email: String
    $password: String
    $bio: String
    $avatar: Upload
  ) {
    editProfile(
      fullName: $fullName
      username: $username
      email: $email
      password: $password
      bio: $bio
      avatar: $avatar
    ) {
      ok
      error
    }
  }
`;

export default EDIT_PROFILE_MUTATION;
