import React from "react";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { useGlobalState } from "../../common/state";
import { Dashbaord } from "../dashboard/Dashboard";
import { Home } from "../home/Home";

export const Router: React.FC = () => {
  const [isAuth] = useGlobalState("isAuthorized");
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">Login</Route>
      <PrivateRoute isAuthenticated={isAuth} restrictedPath="/dashboard">
        <Dashbaord />
      </PrivateRoute>
    </Switch>
  );
};
