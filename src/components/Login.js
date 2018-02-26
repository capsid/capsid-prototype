import React, { Component } from "react";
import { connect } from "react-redux";

import { allRedirectUris, googleAppId } from "../common/injectGlobals";
import { login } from "../reducers/reduceUser";
import { getEgoJwt } from "../services/login";

import RedirectLogin from "./RedirectLogin";

const gapi = global.gapi;

class Login extends Component {
  state = {
    securityError: false
  };

  handleGoogleToken = async token => {
    const response = await getEgoJwt({ token, provider: "google" }).catch(
      error => {
        this.setState({ securityError: true });
        console.error("ego error:", error);
      }
    );
    if (response && response.status === 200) {
      let jwt = await response.text();
      this.props.dispatch(login(jwt));
      this.props.history.push("/");
    } else {
      console.error("response error");
    }
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
            const { id_token } = googleUser.getAuthResponse();
            this.handleGoogleToken(id_token);
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
    let { securityError } = this.state;
    const renderSocialLoginButtons =
      shouldNotRedirect || allRedirectUris.includes(window.location.origin);

    return (
      <div className="Login">
        <h1>Login Here!</h1>
        {securityError ? (
          <div>Connection to ego failed</div>
        ) : renderSocialLoginButtons ? (
          [<div key="google" id="googleSignin" />]
        ) : (
          <RedirectLogin onLogin={({ token }) => this.handleJWT(token)} />
        )}
      </div>
    );
  }
}

export default connect()(Login);
