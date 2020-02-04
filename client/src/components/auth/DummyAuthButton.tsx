import React from "react";
import { useHistory } from "react-router-dom";
import uuid from "uuid";
import { Button, Icon } from "semantic-ui-react";
import { uniqueNamesGenerator, starWars } from "unique-names-generator";
import { useGlobalState } from "../../common/state";
import { dummyUserFactory } from "../../common/factories";

export const DummyAuthButton: React.FC = () => {
  const [, setAuthStatus] = useGlobalState("isAuthorized");
  const [, setUser] = useGlobalState("user");
  const history = useHistory();

  const loginAsDummy = () => {
    setAuthStatus(true);
    setUser(
      dummyUserFactory(
        uniqueNamesGenerator({ dictionaries: [starWars], length: 1 })
      )
    );
    history.push("/dashboard");
  };

  return (
    <Button icon labelPosition="left" onClick={() => loginAsDummy()}>
      <Icon name="user" />
      Log in as Dummy user
    </Button>
  );
};
