import React, { Component } from "react"
import { setApiToken } from "./api/init"
import LoginPage from "./pages/Login"
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
const tokenKey = "userToken"
const savedToken = localStorage.getItem(tokenKey)
setApiToken(savedToken)
injectTapEventPlugin()

class App extends Component {
  state = {
    token: savedToken,
    error: null,
    createAccount: false
  }

  handleError = error => {
    toast.error(error)
  }

  handleSignIn = ({ email, password }) => {
    authAPI
      .signIn({ email, password })
      .then(json => {
        this.setToken(json.jwt)
      })
      .catch(error => {
        this.handleError(error.message)
      })
  }

  handleRegister = ({ email, password }) => {
    authAPI
      .register({ email, password })
      .then(json => {
        this.setToken(json.jwt)
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  handleSignOut = () => {
    this.setToken(null)
  }

  // setToken(null) === signOut()
  setToken = token => {
    if (token) {
      localStorage.setItem(tokenKey, token)
    } else {
      // window.location.href = "/"
      localStorage.removeItem(tokenKey)
    }
    setApiToken(token)
    this.setState({ token: token })
  }

  componentDidMount() {
    authAPI.init(this.handleError)
    loadDeviceApiFunctions("unloadToken", () => this.setToken(null))
  }

  render() {
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
            <NavBar signedIn={!!this.state.token} logOut={this.handleSignOut} />
            <Switch>
              <Route
                path="/login"
                exact
                render={() =>
                  !!this.state.token ? (
                    <Redirect to="/" />
                  ) : (
                    <LoginPage
                      handleErrors={this.handleError}
                      setToken={this.setToken}
                      onSignIn={this.handleSignIn}
                      onRegister={this.handleRegister}
                    />
                  )
                }
              />
              <Route
                path="/"
                render={({ location }) =>
                  !!this.state.token ? (
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
