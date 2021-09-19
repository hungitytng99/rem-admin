import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
// layouts
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import PrivateRoute from "PrivateRoute";
import { PublicRoute } from "PublicRoute";
// views without layouts
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <PublicRoute path="/auth" component={Auth} />
      <PrivateRoute path="/admin" component={Admin} />
      <Redirect from="/*" to="/auth/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
