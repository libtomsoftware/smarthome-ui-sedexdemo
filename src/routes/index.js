import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import { Dashboard } from "../views/dashboard";
import { Devices } from "../views/devices";
import { Layout } from "../layout";
import { Login } from "../views/login";
import Logout from "../views/logout";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import React from "react";
import { Reports } from "../views/reports";
import Restricted from "../views/restricted";
import { Security } from "../views/security";
import { Tasks } from "../views/tasks";
import history from "../providers/history.js";

export const redirectToLogout = () => {
  history.push("/dashboard");
};

export const Routes = () => {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <PublicRoute exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <PrivateRoute exact path="/restricted" component={Restricted} />
          <Route exact path="/dashboard" children={<Dashboard />} />
          <Route exact path="/devices" children={<Devices />} />
          <Route exact path="/reports" children={<Reports />} />
          <Route exact path="/security" children={<Security />} />
          <Route exact path="/tasks" children={<Tasks />} />
          <Redirect from="/" to="/dashboard" />
        </Switch>
      </Layout>
    </Router>
  );
};
