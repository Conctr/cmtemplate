import React, { Component } from 'react'
import bg from '../wimo-bg.png'
import logo from '../wimo-logo.svg'
import TextField from '../components/atoms/TextField'
import RaisedButton from '../components/atoms/RaisedButton'
import LoginModal from '../components/molecules/LoginModal'


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createAccount: false,
      email: '',
      password: ''
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

  render() {
    return (
      <div className='welcome-container'>
        <img src={ bg } alt='wimo background' className='home-bg' />
        <div className='welcome-dialogue'>
          <img src={ logo } alt='hero idk' className='hero-logo' />
          <div>
            <div className='login-text-fields'>
              <TextField
                fullWidth={ true }
                onChange={ this.onEmailChange }
                value={ this.state.email }
                text='Email' />
              <TextField
                fullWidth={ true }
                onChange={ this.onPasswordChange }
                value={ this.state.password }
                text='Password'
                type='password' />
              </div>
            <RaisedButton
              className="login-page-button"
              label="Log in"
              onTouchTap={
                () => this.submitToAuth(this.props.onSignIn)}>Sign In
            </RaisedButton>
            <RaisedButton
              className ="login-page-button"
              label="Register"
              fullWidth={ true } />
            <LoginModal className="login-modal" />
            </div>
        </div>
      </div>
    )
  }
}

export default LoginPage
