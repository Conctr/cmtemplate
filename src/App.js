import React, { Component } from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import { wimoTheme } from "./styles/WimoTheme"

// Api Calls
import { signOutNow } from './api/auth'
import { getDecodedToken } from './api/token'
import { loadFunctions as loadDeviceApiFunctions } from "./api/device"
import {authSignIn, authRegister} from './api/auth'

// Pages
import LoginPage from "./pages/LoginPage"
import DevicesPaper from "../src/components/organisms/DevicesPaper"

// Nav
import NavBar from "../src/components/molecules/NavBar"

// css
import "./custom.css"
import "react-toastify/dist/ReactToastify.min.css"

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
  onGoogleSuccess = (response, status) => {
    const accessToken  = response.Zi.access_token
    const email = response.w3.U3
    const provider = 'google'
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
          console.log(err)
          const conctrError = {
            conctrError: err.response.data.error
          }
          this.setState({ error: conctrError })
        })
    }
  }

  // if OAuth for Google Login fails
  onGoogleFailure = (response, status) => {
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
    console.log(error)
    // errors
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
                      GoogleLoginSuccess={this.onGoogleSuccess}
                      GoogleLoginFailure={this.onGoogleFailure}
                      GoogleRegisterSuccess={this.onGoogleSuccess}
                      GoogleRegisterFailure={this.onGoogleFailure}
                      useColor={false}
                      backgroundColor="#C8C8C8"
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
