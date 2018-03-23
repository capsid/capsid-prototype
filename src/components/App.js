import React from "react";
import { compose } from "recompose";
import { Router, Switch, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { LastLocationProvider } from "react-router-last-location";
import { Box } from "grid-styled";
import queryString from "query-string";

import { encode } from "@capsid/utils";
import NotFound from "@capsid/components/NotFound";
import AuthRedirect from "@capsid/components/AuthRedirect";
import Navbar from "@capsid/components/Navbar";
import Login from "@capsid/components/Login";
import Alignment from "@capsid/components/Alignment";
import Genome from "@capsid/components/Genome";
import Project from "@capsid/components/Project";
import Sample from "@capsid/components/Sample";
import Search from "@capsid/components/Search";

import history from "@capsid/services/history";

import "@blueprintjs/core/dist/blueprint.css";

const ProtectedRoute = connect(state => ({
  token: state.user.token
}))(
  ({ token, ...props }) =>
    token ? <Route {...props} /> : <Redirect to="/login" />
);

// AppWithRouter required to enable children to re-render on location change
// https://github.com/ReactTraining/react-router/issues/4671
const AppWithRouter = compose(
  withRouter,
  connect(state => ({
    lastTab: state.search.lastTab,
    lastSqon: state.search.lastSqon
  }))
)(({ lastTab, lastSqon }) => (
  <div>
    <Navbar />
    <Box p={2}>
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          component={() => (
            <Redirect
              to={{
                pathname: `/search/${lastTab || `projects`}`,
                search: queryString.stringify({ sqon: encode(lastSqon) })
              }}
            />
          )}
        />
        <ProtectedRoute exact path="/search/:tab" component={Search} />
        <ProtectedRoute exact path="/project/:id" component={Project} />
        <ProtectedRoute exact path="/sample/:id" component={Sample} />
        <ProtectedRoute exact path="/alignment/:id" component={Alignment} />
        <ProtectedRoute exact path="/genome/:id" component={Genome} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/auth-redirect" component={AuthRedirect} />
        <Route exact path="/redirected" component={() => null} />
        <Route component={NotFound} />
      </Switch>
    </Box>
  </div>
));

const App = () => (
  <Router history={history}>
    <LastLocationProvider>
      <AppWithRouter />
    </LastLocationProvider>
  </Router>
);

export default App;
