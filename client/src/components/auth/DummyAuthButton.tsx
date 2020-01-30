import React, { useState } from "react";
import { useGlobalState } from "../../lib/state";
import { Button, Box } from "grommet";
import * as Icon from "grommet-icons";
import { useHistory } from "react-router-dom";
import uuid from "uuid";

export const DummyAuthButton: React.FC = () => {
  const [isAuth, setAuth] = useGlobalState("isAuthorized");
  const [getUser, setUser] = useGlobalState("user");
  const history = useHistory();
  const setupDummyUser = () => {
    setAuth(true);
    setUser({ username: "Dummy user", userId: uuid.v4() });
    history.push("/dashboard");
  };
  return (
    <Box align="center" justify="center" height="100vh">
      <Box width={{ max: "300px" }} fill="horizontal">
        <Button
          icon={<Icon.Login />}
          label="Login as Dummy user"
          onClick={() => setupDummyUser()}
        />
      </Box>
    </Box>
  );
};
