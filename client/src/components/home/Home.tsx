import React from "react";
import { useHistory } from "react-router-dom";
import { Login } from "../auth/Login";
import { useGlobalState } from "../../common/state";
import { Loader } from "../ui/Loader";

export const Home: React.FC = () => {
  const [isAuth] = useGlobalState("isAuthorized");
  const history = useHistory();
  if (isAuth) history.replace("/dashboard");

  return (
    <>
      <Login />
      <Loader visible fullscreen={false} />
    </>
  );
};
