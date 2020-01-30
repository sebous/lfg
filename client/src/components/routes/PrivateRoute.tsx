import React from "react";
import { RouteProps, Route, Redirect } from "react-router-dom";

export const AUTHENTICATION_PATH = "/login";

export interface PrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
  restrictedPath: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = props => {
  const redirectPath = !props.isAuthenticated
    ? AUTHENTICATION_PATH
    : props.restrictedPath;

  const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
  return <Route {...props} component={renderComponent} render={undefined} />;
};
