import React, { Component } from 'react';
import { setApiToken } from './api/init'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import DevicePage from './pages/Device'
import NavBar from '../src/components/molecules/NavBar';
import TestPage from './pages/Test'
import './custom.css'
import * as authAPI from './api/auth'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { wimoTheme } from './styles/WimoTheme'
const tokenKey = 'userToken'
const savedToken = localStorage.getItem(tokenKey)
setApiToken(savedToken)
injectTapEventPlugin()

class App extends Component {
  state = {
    token: savedToken,
    error: null,
    createAccount: false
  }

  handleError = (error) => {
    this.setState({ error })
  }

  handleSignIn = ({ email, password }) => {
    authAPI.signIn({ email, password })
      .then(json => {
        this.setToken(json.jwt)
      })
      .catch(error => {
        this.setState({ error: error.message })
      })
  }

  handleRegister = ({ email, password }) => {
    authAPI.register({ email, password })
      .then(json => {
        this.setToken(json.jwt)
      })
      .catch(error => {
        this.setState({ error: error.message })
      })
  }

  handleSignOut = () => {
    this.setToken(null)
  }

  // setToken(null) === signOut()
  setToken = (token) => {
    if (token) {
      localStorage.setItem(tokenKey,token)
    } else {
      localStorage.removeItem(tokenKey)
    }
    setApiToken(token)
    this.setState({ token: token })
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.error === this.state.error && nextState.error != null){
      this.setState({ error: null })
    }
  }

  render() {
    if (!!this.state.error){
      toast.error(this.state.error)
    }
    return (
      <Router>
        {/* apply app theme*/}
        <MuiThemeProvider muiTheme={ wimoTheme }>
          <main>
            <NavBar
              signedIn={ !!this.state.token }
              logOut={
                () => this.setToken(null)
              }
            />
            <ToastContainer
              position="top-right"
              hideProgressBar={ false }
              newestOnTop={ false }
              closeOnClick
            />
            <Switch>
              { !!this.state.token ?
                (
                  <Route
                    exact path='/'
                    render={
                      () => <HomePage
                        handleError={ this.handleError }
                      />
                    }
                  />
                ) : (
                  <Route
                    exact path='/'
                    render={
                      () => <LoginPage
                        setToken={ this.setToken }
                        onSignIn={ this.handleSignIn }
                        onRegister={ this.handleRegister }
                      />
                    }
                  />
                )
              }
              <Route
                exact path='/devices/:deviceId'
                render={
                  ({ match }) => {
                    const deviceId = match.params.deviceId
                    return (
                      <DevicePage
                        handleError={ this.handleError }
                        deviceId={ deviceId }
                      />
                    )
                  }
                }
              />
              <Route
                path='/test'
                render={
                  () => (<TestPage/>)
                }
              />
              <Route
                render={
                  ({ location }) => <p>{
                    location.pathname
                  } not found</p>
                }
              />
            </Switch>
          </main>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default App
