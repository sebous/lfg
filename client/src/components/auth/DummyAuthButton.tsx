import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import { uniqueNamesGenerator, starWars } from "unique-names-generator";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { useGlobalState } from "../../common/state";
import { DummyLogin } from "../../common/graphqlTypes";

const DUMMY_LOGIN = gql`
  mutation DummyLogin($username: String!) {
    dummyLogin(username: $username) {
      id
      username
    }
  }
`;

export const DummyAuthButton: React.FC = () => {
  const [, setAuthStatus] = useGlobalState("isAuthorized");
  const [, setUser] = useGlobalState("user");
  const history = useHistory();
  const [dummyLogin, { error, data }] = useMutation<DummyLogin>(DUMMY_LOGIN);

  if (error) console.log("server error");
  // handle updates on data
  useEffect(() => {
    if (data) {
      setAuthStatus(true);
      setUser({ id: data.dummyLogin.id, username: data.dummyLogin.username });
      history.push("/dashboard");
    }
  }, [data]);

  return (
    <Button
      icon
      labelPosition="left"
      onClick={() =>
        dummyLogin({
          variables: {
            username: uniqueNamesGenerator({
              dictionaries: [starWars],
              length: 1,
            }),
          },
        })
      }
    >
      <Icon name="user" />
      Log in as Dummy user
    </Button>
  );
};
