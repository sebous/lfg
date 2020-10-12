import { gql } from "@apollo/client";

export const LOGIN_VIA_COOKIE = gql`
  query LoginViaCookie {
    loginViaCookie {
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
      id
      username
      name
      fbId
      avatar
      queuing
    }
  }
`;
