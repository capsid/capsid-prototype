import React from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

import AuthRedirect from "./AuthRedirect";
import Header from "./Header";
import Login from "./Login";
import OldTable from "./OldTable";
import Projects from "./Projects";

const ProtectedRoute = connect(state => ({
  token: state.user.token
}))(
  ({ token, ...props }) =>
    token ? <Route {...props} /> : <Redirect to="/login" />
);

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Header />
      <Switch>
        <ProtectedRoute exact path="/" component={Projects} />
        <ProtectedRoute exact path="/old-table" component={OldTable} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/auth-redirect" component={AuthRedirect} />
        <Route exact path="/redirected" component={() => null} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;