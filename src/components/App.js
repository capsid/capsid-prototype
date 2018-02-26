import React from "react";
import { Router, Switch, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

import AuthRedirect from "./AuthRedirect";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Search from "./Search";

import Alignment from "./Alignment";
import Genome from "./Genome";
import Project from "./Project";
import Sample from "./Sample";

import history from "../services/history";

const ProtectedRoute = connect(state => ({
  token: state.user.token
}))(
  ({ token, ...props }) =>
    token ? <Route {...props} /> : <Redirect to="/login" />
);

const App = () => (
  <Router history={history}>
    <div className="App">
      <Header />
      <div style={{ padding: 20 }}>
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/search/:tab" component={Search} />
          <ProtectedRoute exact path="/projects/:id" component={Project} />
          <ProtectedRoute exact path="/samples/:id" component={Sample} />
          <ProtectedRoute exact path="/alignments/:id" component={Alignment} />
          <ProtectedRoute exact path="/genome/:id" component={Genome} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/auth-redirect" component={AuthRedirect} />
          <Route exact path="/redirected" component={() => null} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
