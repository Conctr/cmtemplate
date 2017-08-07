import React, { Component } from 'react';
import { setApiToken } from './api/init'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import DevicesPage from './pages/Devices'
import DevicePage from './pages/Device'
import './custom.css'
import * as authAPI from './api/auth'
import * as deviceAPI from './api/device'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
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

  handleSignIn = ({ email, password }) => {
    authAPI.signIn({ email, password })
      .then(json => {
        // console.log(json)
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
    setApiToken(savedToken)
    this.setState({ token: token })
  }

  render() {
    if (!!this.state.error){
      toast.error(this.state.error)
    }
    return (
      <Router>
  <main>
    {/*!!this.state.token && <NavBar/>*/}
    <ToastContainer
    position="top-right"
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick>
    <button>hai</button>
    </ToastContainer>
    <button onClick={this.notify}>Add Notification</button>
    <h1>{!!this.state.token ? 'SignedIn' : 'SignedOut'}</h1>
    <Switch>
      { !!this.state.token ? (
        <Route exact path='/' render={
            () => <HomePage onSignOut={this.handleSignOut}/>
        } />
      ): (
        <Route exact path='/' render={
            () => <LoginPage
            onSignIn={this.handleSignIn}
            onRegister={this.handleRegister}/>
        } />
      )}
      <Route exact path='/devices' render={ () => (
          // Create token checker method that renders please login
          <DevicesPage getDevicesData={deviceAPI.getAll}/>
        ) } />
      <Route exact path='/devices/:deviceId' render={
            ({ match }) => {
              const deviceId = match.params.deviceId
              return (
                <DevicePage deviceId={deviceId} />
              )
            }
          } />

      <Route path='/lo' render={
        () => (
          <h1>low</h1>
        )
      } />
      <Route render={
        ({ location }) => <p>{ location.pathname } not found</p>
      } />
    </Switch>
  </main>
</Router>
    );
  }
}

export default App;
