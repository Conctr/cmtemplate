import React, { Component } from 'react';

function submitSignIn(event, onSignIn) {
  // Stop usual browser form submission
  event.preventDefault()

  // Get <form>
  const form = event.target
  // Get values from the field
  const email = form.elements['email'].value
  const password = form.elements['password'].value
  // Call the onSignIn function with our values
  onSignIn({ email, password })
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
      <h1>{this.props.title}</h1>
      <button onClick={this.handleAccountChange} >
        { this.state.createAccount ? ('Sign In') : ('Create Account') }
      </button>
      { this.state.createAccount ? (
        <form
          // onSubmit={ (event) => submitCreateAccount(event, onCreateAccount) }
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
            onSubmit={ (event) => submitSignIn(event, this.props.onSignIn) }
          >
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
