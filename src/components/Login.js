import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import jwtDecode from "jwt-decode";

import { allRedirectUris, googleAppId } from "../common/injectGlobals";
import { setLoggedInUser } from "../reducers/reduceUser";
import { googleLogin } from "../services/login";
import RedirectLogin from "./RedirectLogin";

const gapi = global.gapi;

class Login extends Component {
  state = {
    securityError: false
  };

  handleJWT = async jwt => {
    const { dispatch, history } = this.props;
    await dispatch(
      setLoggedInUser({
        token: jwt,
        profile: jwtDecode(jwt).context.user
      })
    );
    history.push("/");
  };

  handleGoogleToken = async token => {
    const response = await googleLogin(token).catch(error => {
      this.setState({ securityError: true });
      console.error("google auth error", error.message);
    });
    if (response && response.status === 200) {
      let jwt = await response.text();
      this.handleJWT(jwt);
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
    const renderSocialLoginButtons =
      this.props.shouldNotRedirect ||
      allRedirectUris.includes(window.location.origin);

    return (
      <div className="Login">
        <h1>Login Here!</h1>
        {this.state.securityError ? (
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

export default connect()(withRouter(Login));
