import React, { Component } from "react";
import * as oauthApi from "../api/oAuth";
import CircularProgress from "material-ui/CircularProgress";
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "../components/atoms/TextField";
import GoogleIcon from "react-icons/lib/fa/google";
import conctrLogo from "../imgs/conctr-logo.png";
import Logo from "../imgs/logoImage.jpg";
import backgroundImageFile from "../imgs/placeholder-background.svg";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createAccount: false,
      email: "",
      password: "",
      loading: false
    };
  }

  submitToAuth = callback => {
    // Get values from the field
    const email = this.state.email;
    const password = this.state.password;
    // Call the callback function with our values
    callback({ email, password });
  };

  //handle user input and set password and email state
  onInputChange = (e, newValue) => {
    this.setState({
      [e.target.id]: newValue
    });
  };

  handleAccountChange = () =>
    this.setState({
      createAccount: !this.state.createAccount
    });

  changeLoading = loading => {
    this.setState({
      loading
    });
  };

  componentDidMount() {
    // init google auth
    oauthApi.start(
      this.changeLoading,
      this.props.setToken,
      this.props.handleErrors
    );
  }

  render() {
    const useColor = false;
    const backgroundColor = "#C8C8C8";

    return (
      <div
        className="login-background"
        style={
          !useColor
            ? {
                backgroundImage: `url(${backgroundImageFile})`
              }
            : {
              background: `${backgroundColor}`
            }
        }
      >
        <div className="conctr-footer-box">
          <div className="conctr-footer-text">powered by</div>
          <a href="https://conctr.com/">
            <img
              src={conctrLogo}
              alt="conctr logo"
              className="conctr-footer-logo"
            />
          </a>
        </div>
        <div className="welcome-container">
          {this.state.loading ? (
            <CircularProgress />
          ) : (
              <div className="login-dialog">
                <img
                  src={!!logoUrl ? logoUrl : Logo}
                  alt="app logo"
                  className="app-login-logo"
                />
                <div>
                  <div className="element" />
                  <div className="login-text-fields">
                    <TextField
                      id="email"
                      floatingLabelText="Email"
                      fullWidth={true}
                      onChange={this.onInputChange}
                      onEnterKeyDown={() =>
                        this.submitToAuth(this.props.onSignIn)
                      }
                      value={this.state.email}
                      hintText="Email"
                    />
                    <TextField
                      id="password"
                      floatingLabelText="Password"
                      fullWidth={true}
                      onChange={this.onInputChange}
                      onEnterKeyDown={() =>
                        this.submitToAuth(this.props.onSignIn)
                      }
                      value={this.state.password}
                      hintText="Password"
                      type="password"
                    />
                  </div>
                  <RaisedButton
                    className="login-button"
                    label="Log in"
                    onTouchTap={() => this.submitToAuth(this.props.onSignIn)}
                  />
                  <RaisedButton
                    className="login-button"
                    label="Log in with Google"
                    onTouchTap={() => oauthApi.signIn("signin")}
                    icon={<GoogleIcon className="button-icon" />}
                  />
                  <div className="login-divider">
                    <Divider />
                  </div>
                  <div className="login-text">Device, but no account?</div>
                  <RaisedButton
                    className="login-button"
                    label="Register with Google"
                    onTouchTap={() => oauthApi.signIn("register")}
                    primary={true}
                    icon={<GoogleIcon className="button-icon" />}
                  />
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
}
