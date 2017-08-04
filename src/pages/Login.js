import React, { Component } from 'react';
import Checkbox from '../components/atoms/Checkbox'
import RaisedButton from '../components/atoms/RaisedButton'
import LoginModal from '../components/molecules/LoginModal'

function submitToAuth(event, callback) {
  // Stop usual browser form submission
  event.preventDefault()

  // Get <form>
  const form = event.target
  // Get values from the field
  const email = form.elements['email'].value
  const password = form.elements['password'].value
  // Call the callback function with our values
  callback({ email, password })
}

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {createAccount: false};
  }
  
  handleAccountChange = () => this.setState({createAccount: !this.state.createAccount})

  render() {
    return (
      <div>
        <Checkbox label="remember me" labelPosition='left' />
        <div>
          <RaisedButton label="Register" />
          <LoginModal />
        </div>
      <RaisedButton onTouchTap={this.handleAccountChange}
        label={ this.state.createAccount ? ('Sign In') : ('Create Account') } />

      { this.state.createAccount ? (
        <form
          onSubmit={ (event) => submitToAuth(event, this.props.onRegister) }
        >
          <label>
            <span>Email </span>
            <input name='email' />
          </label>
          <label>
            <span>Password </span>
            <input type='password' name='password' />
          </label>
          <button>Create Account</button>
        </form>
        ) : (
          <form
            onSubmit={ (event) => submitToAuth(event, this.props.onSignIn) } >
            <label>
              <span>Email </span>
              <input name='email' />
            </label>
            <label>
              <span>Password </span>
              <input type='password' name='password' />
            </label>
            <button>Sign In</button>
          </form>
        )
      }
      </div>
    )
  }
}

export default LoginPage
