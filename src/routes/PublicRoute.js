import * as React from "react";

import { Redirect, Route } from "react-router-dom";

import AuthService from "../services/auth";

export const PublicRoute = ({ component: Component, ...rest }) => {
  const render = (props) =>
    !AuthService.check() ? (
      <Component {...props} />
    ) : (
      <Redirect to="/dashboard" />
    );

  return <Route {...rest} render={render} />;
};
