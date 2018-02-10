import React, { Component } from "react"

import { signOutNow } from './api/auth'
import { getDecodedToken } from './api/token'

import LoginPage from "./pages/LoginPage"
import NavBar from "../src/components/molecules/NavBar"
import DevicesPaper from "../src/components/organisms/DevicesPaper"
import "./custom.css"
import * as authAPI from "./api/auth"
import injectTapEventPlugin from "react-tap-event-plugin"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import { wimoTheme } from "./styles/WimoTheme"
import { loadFunctions as loadDeviceApiFunctions } from "./api/device"
injectTapEventPlugin()

class App extends Component {
  state = {
    decodedToken: getDecodedToken(),
    error: null,
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken:null })
  }
  // handleError = error => {
  //   toast.error(error)
  // }

  // handleSignIn = ({ email, password }) => {
  //   authAPI
  //     .signIn({ email, password })
  //     .then(json => {
  //       this.setToken(json.jwt)
  //     })
  //     .catch(error => {
  //       this.handleError(error.message)
  //     })
  // }

  // handleRegister = ({ email, password }) => {
  //   authAPI
  //     .register({ email, password })
  //     .then(json => {
  //       this.setToken(json.jwt)
  //     })
  //     .catch(error => {
  //       this.handleError(error)
  //     })
  // }

  // handleSignOut = () => {
  //   this.setToken(null)
  // }

  // setToken(null) === signOut()
  // setToken = token => {
  //   if (token) {
  //     localStorage.setItem(tokenKey, token)
  //   } else {
  //     // window.location.href = "/"
  //     localStorage.removeItem(tokenKey)
  //   }
  //   setApiToken(token)
  //   this.setState({ token: token })
  // }

  // componentDidMount() {
    // authAPI.init(this.handleError)
    // loadDeviceApiFunctions("unloadToken", () => this.setToken(null))
  // }

  render() {
    const {decodedToken} = this.state
    const signedIn = !!decodedToken
    return (
      <Router>
        {/* apply app theme*/}
        <MuiThemeProvider muiTheme={wimoTheme}>
          <main>
            <ToastContainer
              position="top-right"
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
            />
            <NavBar signedIn={signedIn} logOut={this.signOutNow} />
            <Switch>
              <Route
                path="/login"
                exact
                render={() =>
                  signedIn ? (
                    <Redirect to="/" />
                  ) : (
                    <LoginPage
                      // GoogleLoginSuccess={this.onGoogleLoginSuccess}
                      // GoogleLoginFailure={this.onGoogleLoginFailure}
                      
                      // handleErrors={this.handleError}
                      // setToken={this.setToken}
                      // onSignIn={this.handleSignIn}
                      // onRegister={this.handleRegister}
                    />
                  )
                }
              />
              <Route
                path="/"
                render={({ location }) =>
                  signedIn ? (
                    <DevicesPaper
                      pathname={location.pathname.substring(1)}
                      handleError={this.handleError}
                    />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />

              <Route
                render={({ location }) => <p>{location.pathname} not found</p>}
              />
            </Switch>
          </main>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default App
