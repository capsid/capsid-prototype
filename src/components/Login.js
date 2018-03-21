import React, { Component } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router";
import { Card } from "@blueprintjs/core";
import { Flex, Box } from "grid-styled";

import { logoutAll } from "@capsid/services/login";
import { login } from "@capsid/reducers/reduceUser";
import { withParams } from "@capsid/utils";

import { Login as LoginQuery } from "@capsid/components/queries";

const gapi = global.gapi;

const enhance = compose(connect(), withApollo, withRouter, withParams);

class Login extends Component {
  state = {
    validation: [],
    networkError: false
  };

  login = async ({ token, provider }) => {
    const { client, dispatch, history, params: { redirect } } = this.props;
    client
      .query({
        query: LoginQuery,
        variables: { token, provider }
      })
      .then(({ data: { item } }) => {
        dispatch(login(item));
        history.push(redirect || "/");
      })
      .catch(async ({ graphQLErrors, networkError }) => {
        await logoutAll();
        this.setState({
          validation: graphQLErrors.map(({ message }) => message),
          networkError: !!networkError
        });
        networkError && console.error(networkError);
      });
  };

  componentDidMount() {
    try {
      gapi.signin2.render("googleSignin", {
        scope: "profile email",
        width: 240,
        height: 40,
        longtitle: true,
        theme: "light",
        onsuccess: googleUser => {
          const { id_token: token } = googleUser.getAuthResponse();
          this.login({ token, provider: "google" });
        },
        onfailure: error => console.error("login fail", error)
      });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    let { validation, networkError } = this.state;

    return (
      <Flex justifyContent="center">
        <Box mt={200} width={500}>
          <Card>
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <h4>Please Login</h4>
              {networkError ? (
                <div>Connection to Capsid API failed</div>
              ) : (
                <div>
                  {validation.map(x => <div key={x}>{x}</div>)}
                  <div key="google" id="googleSignin" />
                </div>
              )}
            </Flex>
          </Card>
        </Box>
      </Flex>
    );
  }
}

export default enhance(Login);
