import React, { Component } from 'react'
import bg from '../wimo-bg.png'
import logo from '../wimo-logo.svg'
import TextField from '../components/atoms/TextField'
import Checkbox from '../components/atoms/Checkbox'
import RaisedButton from '../components/atoms/RaisedButton'
import LoginModal from '../components/molecules/LoginModal'
import GoogleLoginButton from '../components/molecules/GoogleLoginButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import CircularProgress from 'material-ui/CircularProgress'
import * as oauthApi from '../api/oAuth'


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
  onEmailChange = (e,newValue) => {
    console.log(newValue)
    this.setState({
      email: newValue
    })
  }

  onPasswordChange = (e,newValue) => {
    console.log(newValue)
    this.setState({
      password: newValue
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
      <div className='welcome-container'>
        {this.state.loading ? (
          <MuiThemeProvider>
            <CircularProgress/>
          </MuiThemeProvider>
        ) : (
          <div>
            <img src={ bg } className='home-bg' />
            <div className='welcome-dialogue'>
              <img src={ logo } className='hero-logo' />
              <div>
                <TextField
                  onChange={ this.onEmailChange }
                  value={ this.state.email }
                  text='Email' />
                <TextField
                  onChange={ this.onPasswordChange }
                  value={ this.state.password }
                  text='Password'
                  type='password' />
                <RaisedButton
                  className="login-page-button"
                  label="Log in"
                  onTouchTap={
                    () => this.submitToAuth(this.props.onSignIn)}>Sign In
                </RaisedButton>

                <RaisedButton
                  className="login-page-button"
                  label="Sign In with googles"
                  onTouchTap={() => oauthApi.signIn('signin')}>
                  Sign in with google
                </RaisedButton>
                <br />
                <RaisedButton
                  className ="login-page-button"
                  label="Register"
                  fullWidth={ true } />
                <br />
                <LoginModal className="login-modal" />
                </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default LoginPage
