import React from "react";
import { Router, Switch, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import styled from "react-emotion";
import { withRouter } from "react-router";

import NotFound from "@capsid/components/NotFound";
import AuthRedirect from "@capsid/components/AuthRedirect";
import Header from "@capsid/components/Header";
import Home from "@capsid/components/Home";
import Login from "@capsid/components/Login";
import Alignment from "@capsid/components/Alignment";
import Genome from "@capsid/components/Genome";
import Project from "@capsid/components/Project";
import Sample from "@capsid/components/Sample";
import Search from "@capsid/components/Search";

import { LoggedIn } from "@capsid/components/access";

import history from "@capsid/services/history";

const ProtectedRoute = connect(state => ({
  token: state.user.token
}))(
  ({ token, ...props }) =>
    token ? <Route {...props} /> : <Redirect to="/login" />
);

const Content = styled("div")`
  padding: 20px;
`;

// AppWithRouter required to enable children to re-render on location change
// https://github.com/ReactTraining/react-router/issues/4671
const AppWithRouter = withRouter(() => (
  <div>
    <LoggedIn>
      <Header />
    </LoggedIn>
    <Content>
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
        <Route component={NotFound} />
      </Switch>
    </Content>
  </div>
));

const App = () => (
  <Router history={history}>
    <AppWithRouter />
  </Router>
);

export default App;
