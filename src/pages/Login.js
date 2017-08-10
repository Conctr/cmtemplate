import React, { Component } from 'react'
import bg from '../wimo-bg-y.png'
import logo from '../wimo-logo-3.svg'
import TextField from '../components/atoms/TextField'
import RaisedButton from '../components/atoms/RaisedButton'
import LoginModal from '../components/molecules/LoginModal'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Paper from 'material-ui/Paper'
import { FormsyText } from 'formsy-material-ui/lib'
import Formsy from 'formsy-react'

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
      loading: false,
      canSubmit: false,
      errorMessages: {
        wordsError: "Please only use letters",
        numericError: "Please provide a number",
        urlError: "Please provide a valid URL"
      },
      styles: {
        paperStyle: {
          width: 300,
          margin: 'auto',
          padding: 20
        }
      }
    }
  }

  submitToAuth = (callback) => {
    // Get values from the field
    const email = this.state.email
    const password = this.state.password
    // Call the callback function with our values
    callback({ email, password })
  }

  onEmailChange = (e, newValue) => {
    this.setState({
      email: newValue
    })
  }

  onPasswordChange = (e, newValue) => {
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

  enableButton = () => {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton = () => {
    this.setState({
      canSubmit: false,
    });
  }

  submitForm = (data) => {
    alert(JSON.stringify(data, null, 4));
  }

  notifyFormError = (data) => {
    console.error('Form error:', data);
  }

  render() {

    let { paperStyle, switchStyle, submitStyle } = this.state.styles;
    let { wordsError, numericError, urlError } = this.state.errorMessages;
    
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
                    fullWidth={ true }
                    onChange={ this.onEmailChange }
                    value={ this.state.email }
                    onEnterKeyDown={
                      () => this.submitToAuth(this.props.onSignIn)
                    }
                    text='Email' />
                  <TextField
                    fullWidth={ true }
                    onChange={ this.onPasswordChange }
                    onEnterKeyDown={
                      () => this.submitToAuth(this.props.onSignIn)
                    }
                    value={ this.state.password }
                    text='Password'
                    type='password' />
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
                  label="Sign In with googles"
                  onTouchTap={() => oauthApi.signIn('signin')}
                />
                <RaisedButton
                  className ="login-page-button"
                  label="Register"
                  fullWidth={ true }
                />
                <LoginModal className="login-modal" />
                <MuiThemeProvider muiTheme={ getMuiTheme() }>
                  <Paper style={ this.paperStyle }>
                    <Formsy.Form
                      onValid={ this.enableButton }
                      onInvalid={ this.disableButton }
                      onValidSubmit={ this.submitForm }
                      onInvalidSubmit={ this.notifyFormError }
                    >
                      <FormsyText
                        name="name"
                        validations="isWords"
                        required
                        hintText="Email address"
                        floatingLabelText="Email address"
                      /> 
                    </Formsy.Form>
                  </Paper>
                </MuiThemeProvider>
                </div>
            </div>
            <span>powered by</span>
          </div>
        )}
      </div>
    )
  }
}

export default LoginPage
