import { gql } from "@apollo/client";

export const CHECK_TOKEN = gql`
  query CheckToken {
    checkToken {
      id
      username
      name
      fbId
      avatar
      queuing
    }
  }
`;

export const FB_LOGIN = gql`
  mutation FBlogin($input: FBLoginInput!) {
    FBlogin(input: $input) {
      token
      user {
        id
        username
        name
        fbId
        avatar
        queuing
      }
    }
  }
`;
