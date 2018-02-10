import React, { Component } from "react"
import { signOutNow } from './api/auth'
import { getDecodedToken } from './api/token'

import LoginPage from "./pages/LoginPage"
import NavBar from "../src/components/molecules/NavBar"
import DevicesPaper from "../src/components/organisms/DevicesPaper"
import "./custom.css"
import * as authAPI from "./api/auth"
import {authSignIn, authRegister} from './api/auth'
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

class App extends Component {
  state = {
    decodedToken: getDecodedToken(),
    error: null,
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null })
  }

  // if OAuth for Google Login Passes
  onGoogleLoginSuccess = (response, status) => {
    const email = response.profile.email
    const provider = response._provider
    const accessToken = response.token.accessToken
    if (status === "signIn") {
      authSignIn(email, provider, accessToken)
        .then(decodedToken => {
          console.log(decodedToken)
          this.setState({decodedToken})
        })
        .catch(err => {
          const conctrError = {
            conctrError: err.response.data.error
          }
          this.setState({ error: conctrError })
        })
    }
    if (status === "register") {
      authRegister(email, provider, accessToken)
        .then(conctrUser => {
          this.setState({ token: conctrUser.jwt })
        })
        .catch(err => {
          const conctrError = {
            conctrError: err.response.data.error
          }
          this.setState({ error: conctrError })
        })
    }
  }

  // if OAuth for Google Login fails
  onGoogleLoginFailure = (response, status) => {
    if (status === "signIn") {
      if (response.message) {
        const googleError = {
          error: response.message
        }
        this.setState({ error: googleError })
      }
    }
    // register
    if (status === "register") {
      if (response.message) {
        const googleError = {
          error: response.message
        }
        this.setState({ error: googleError })
      }
    }
  }


  render() {
    const {decodedToken, error} = this.state
    const signedIn = !!decodedToken
    error && error.conctrError && toast.error(error.conctrError)
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
            <NavBar signedIn={signedIn} logOut={this.onSignOut} />
            <Switch>
              <Route
                path="/login"
                exact
                render={() =>
                  signedIn ? (
                    <Redirect to="/" />
                  ) : (
                    <LoginPage
                      GoogleLoginSuccess={this.onGoogleLoginSuccess}
                      GoogleLoginFailure={this.onGoogleLoginFailure}
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
                      // handleError={this.handleError}
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
