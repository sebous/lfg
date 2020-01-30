import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { useGlobalState } from "../../lib/state";
import { DummyAuthButton } from "../auth/DummyAuthButton";
import { Dashbaord } from "../dashboard/Dashboard";

export const Router: React.FC = () => {
  const [isAuth] = useGlobalState("isAuthorized");
  return (
    <Switch>
      <Route exact path="/">
        <DummyAuthButton />
      </Route>
      <Route path="/login">Login</Route>
      <PrivateRoute isAuthenticated={isAuth} restrictedPath="/dashboard">
        <Dashbaord />
      </PrivateRoute>
    </Switch>
  );
};
