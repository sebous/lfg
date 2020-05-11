import React from "react";
import { RouteProps, Route, Redirect } from "react-router-dom";

export const AUTHENTICATION_PATH = "/";

export interface PrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
}

// TODO: refactor this via router-dom docs
export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) =>
      isAuthenticated ? children : <Redirect to={{ pathname: AUTHENTICATION_PATH, state: { from: location } }} />
    }
  />
);
