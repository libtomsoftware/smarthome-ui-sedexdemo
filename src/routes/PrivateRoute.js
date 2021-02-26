import * as React from "react";

import { Redirect, Route } from "react-router-dom";

import AuthService from "../services/auth";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const render = (props) =>
    AuthService.check() ? <Component {...props} /> : <Redirect to="/logout" />;

  return <Route {...rest} render={render} />;
};
