import React, { Component } from "react";
import { connect } from "react-redux";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router";

import { allRedirectUris, googleAppId } from "@capsid/common/injectGlobals";
import { logoutAll } from "@capsid/services/login";
import { login } from "@capsid/reducers/reduceUser";

import RedirectLogin from "@capsid/components/RedirectLogin";
import { Login as LoginQuery } from "@capsid/components/queries";

const gapi = global.gapi;

class Login extends Component {
  state = {
    validation: [],
    networkError: false
  };

  login = async ({ token, provider }) => {
    const { client, dispatch, history } = this.props;
    client
      .query({
        query: LoginQuery,
        variables: { token, provider }
      })
      .then(({ data: { item } }) => {
        dispatch(login(item));
        history.push("/");
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
      gapi.load("auth2", () => {
        gapi.auth2.init({
          client_id: googleAppId
        });
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
      });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    let { shouldNotRedirect } = this.props;
    let { validation, networkError } = this.state;
    const renderSocialLoginButtons =
      shouldNotRedirect || allRedirectUris.includes(window.location.origin);

    return (
      <div className="Login">
        <h1>Capsid Login</h1>
        {networkError ? (
          <div>Connection to Capsid API failed</div>
        ) : renderSocialLoginButtons ? (
          <div>
            {validation.map(x => <div key={x}>{x}</div>)}
            <div key="google" id="googleSignin" />
          </div>
        ) : (
          <RedirectLogin onLogin={this.login} />
        )}
      </div>
    );
  }
}

export default connect()(withApollo(withRouter(Login)));
