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
  onGoogleLoginSuccess = (status, response) => {
    const email = response.profile.email
    const provider = response._provider
    const accessToken = response.token.accessToken
    if (status === "signIn") {
      authSignIn(email, provider, accessToken)
        .then(decodedToken => {
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
          this.setState({decodedToken})
        })
    }
  }


  render() {
    const {decodedToken} = this.state
    const signedIn = !!decodedToken
    console.log(decodedToken)
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
                      GoogleLoginSuccess={this.onGoogleLoginSuccess}
                      GoogleLoginFailure={this.onGoogleLoginFailure}
                      
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
