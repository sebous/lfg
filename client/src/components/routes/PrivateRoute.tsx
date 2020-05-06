import React from "react";
import { RouteProps, Route, Redirect } from "react-router-dom";

export const AUTHENTICATION_PATH = "/";

export interface PrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
  restrictedPath: string;
}

// TODO: refactor this via router-dom docs
export const PrivateRoute: React.FC<PrivateRouteProps> = props => {
  console.log(props);
  const { restrictedPath } = props;
  if (props.isAuthenticated) {
    return <Route {...props} component={() => <Redirect to={{ pathname: restrictedPath }} />} />;
  }
  return <Redirect to={{ pathname: AUTHENTICATION_PATH }} />;
};
