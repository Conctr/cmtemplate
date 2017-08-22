import React from 'react'
import Divider from 'material-ui/Divider'
import GoogleIcon from 'react-icons/lib/fa/google'
import TextField from '../atoms/TextField'
import RaisedButton from  '../atoms/RaisedButton'
import RegistrationModal from './RegistrationModal'
import logo from '../../imgs/wimo-logo.svg'

export default function LoginDialog {

  return (
    <div className='login-dialogue'>
      <img
        src={ logo } alt='wimo logo' className='login-logo' />
      <div>
        <div className='login-text-fields'>
          <TextField
            id='email'
            floatingLabelText='Email'
            fullWidth={ true }
            onChange={ this.onInputChange }
            onEnterKeyDown={
              () => this.submitToAuth(this.props.onSignIn)
            }
            value={ this.state.email }
            hintText='Email'
          />
          <TextField
            id='password'
            floatingLabelText='Password'
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
          className='login-button'
          label='Log in'
          onTouchTap={
            () => this.submitToAuth(this.props.onSignIn)
          }
        />
        <RaisedButton
          className='login-button'
          label='Log in with Google'
          onTouchTap={
            () => oauthApi.signIn('signin')
          }
          icon={<GoogleIcon className='button-icon'/>}
        />
        <div className='login-divider'>
          <Divider />
        </div>
        <div className='login-text'>
          Device, but no account?
        </div>
        <RegistrationModal className='login-modal' />
      </div>
    </div>
  )
}
