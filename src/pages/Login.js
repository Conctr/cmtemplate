import React, { Component } from 'react'
import Background from '../imgs/wimo-bg-y.png'
import Logo from '../imgs/wimo-logo-3.svg'
import TextField from '../components/atoms/TextField'
import RaisedButton from '../components/atoms/RaisedButton'
import LoginModal from '../components/molecules/LoginModal'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import CircularProgress from 'material-ui/CircularProgress'
import * as oauthApi from '../api/oAuth'

// let splashStyle = {
//   width: '100%',
//   backgroundImage: 'url(' + Background + ')'
// }

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createAccount: false,
      email: '',
      password: '',
      loading: false
    }
  }

 submitToAuth = (callback) => {
  // Get values from the field
  const email = this.state.email
  const password = this.state.password
  // Call the callback function with our values
  callback({ email, password })
  }

  onInputChange = (e, newValue) => {
    //handle user input and set password and email values
    this.setState({ 
      [e.target.id]: newValue 
    }) 
  }

  handleAccountChange = () => this.setState({
    createAccount: !this.state.createAccount
  })

  changeLoading = (loading) => {
    this.setState({
      loading
    })
  }

  componentDidMount() {
    // init google auth
    oauthApi.start(this.changeLoading,this.props.setToken)
  }

  render() {
    return (
      <div
        className='home-splash tip-top'
        // style={ splashStyle }
      >
        <div className='welcome-container'>
          {this.state.loading ? (
            <MuiThemeProvider>
              <CircularProgress/>
            </MuiThemeProvider>
          ) : (
              <div className='welcome-dialogue'>
                <img
                  src={ Logo } alt='wimo logo' className='hero-logo' />
                <div>
                  <div className='login-text-fields'>
                    <TextField
                      id={ 'email' }
                      fullWidth={ true }
                      onChange={ this.onInputChange }
                      onEnterKeyDown={
                        () => this.submitToAuth(this.props.onSignIn)
                      }
                      value={ this.state.email }
                      hintText='Email'
                    />
                    <TextField
                      id={ 'password' }
                      fullWidth={ true }
                      onChange={ this.onInputChange }
                      onEnterKeyDown={
                        () => this.submitToAuth(this.props.onSignIn)
                      }
                      value={ this.state.password }
                      hintText='Password'
                      type='password'
                    />
                  </div>
                  <RaisedButton
                    className="login-page-button"
                    label="Log in"
                    onTouchTap={
                      () => this.submitToAuth(this.props.onSignIn)
                    }
                  />
                  <RaisedButton
                    className="login-page-button"
                    label="Log in with Google"
                    onTouchTap={
                      () => oauthApi.signIn('signin')
                    }
                  />
                  <RaisedButton
                    className ="login-page-button"
                    label="Register"
                    fullWidth={ true }
                  />
                  <LoginModal className="login-modal" />
              </div>
              <div className='conctr-footer'>
                <span style={{ color: 'white' }}>Powered by Conctr</span>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default LoginPage
