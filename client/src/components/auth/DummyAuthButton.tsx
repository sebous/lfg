import React from "react";
import { useGlobalState } from "../../common/state";
import { useHistory } from "react-router-dom";
import uuid from "uuid";
import { Button, Icon } from "semantic-ui-react";

export const DummyAuthButton: React.FC = () => {
  const [, setAuthStatus] = useGlobalState("isAuthorized");
  const [, setUser] = useGlobalState("user");
  const history = useHistory();

  const loginAsDummy = () => {
    setAuthStatus(true);
    setUser({ username: "Dummy user", userId: uuid.v4() });
    history.push("/dashboard");
  };

  return (
    <Button icon labelPosition="left" onClick={() => loginAsDummy()}>
      <Icon name="user" />
      Log in as Dummy user
    </Button>
  );
};
