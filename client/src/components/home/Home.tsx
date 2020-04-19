import React from "react";
import { useHistory } from "react-router-dom";
import { Login } from "../auth/Login";
import { useGlobalState } from "../../common/state";

export const Home: React.FC = () => {
  const [isAuth] = useGlobalState("isAuthorized");
  const history = useHistory();
  if (isAuth) history.replace("/dashboard");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Login />
    </div>
  );
};
