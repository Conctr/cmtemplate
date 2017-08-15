import React, { Component } from 'react'
import bg from '../imgs/wimo-bg-y.png'
import logo from '../imgs/wimo-logo-3.svg'
import TextField from '../components/atoms/TextField'
import RaisedButton from '../components/atoms/RaisedButton'
import LoginModal from '../components/molecules/LoginModal'

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

  onInputChange = (e, newValue) => {
    console.log(e.target.id)
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
      <div className='welcome-container'>
        {this.state.loading ? (
          <MuiThemeProvider>
            <CircularProgress/>
          </MuiThemeProvider>
        ) : (
          <div>
            <img src={ bg } alt='wine bottles' className='home-bg' />
            <div className='welcome-dialogue'>
              <img
                src={ logo } alt='wimo logo' className='hero-logo' />
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
                  onTouchTap={() => oauthApi.signIn('signin')}
                />
                <RaisedButton
                  className ="login-page-button"
                  label="Register"
                  fullWidth={ true }
                />
                <LoginModal className="login-modal" />
                </div>
            </div>
            <div className='conctr-footer'>
              <span style={{color: 'white'}}>Powered by Conctr</span>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default LoginPage
