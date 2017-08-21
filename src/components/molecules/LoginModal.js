import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/RaisedButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from '../atoms/TextField.js'
import Divider from 'material-ui/Divider'
import logo from '../../imgs/wimo-logo.svg'
import GoogleIcon from 'react-icons/lib/fa/google'

export default class LoginModal extends React.Component{

  state={
    open: false
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const actions = [
      <FlatButton
        label='Cancel'
        primary={ false }
        onTouchTap={ this.handleClose }
      />
    ]

    return (
      <div
        className='register-modal-button'
      >
        <RaisedButton
          className='login-button'
          fullWidth={ true }
          label='Register'
          onTouchTap={ this.handleOpen }
        />
        <Dialog
          actions={ actions }
          modal={ true }
          open={ this.state.open }
          actionsContainerClassName={ 'login-modal-actions' }
          bodyClassName={ 'login-modal-body' }
          contentClassName={ 'login-modal-content' } 
          overlayClassName={ 'login-modal-overlay' }
          paperClassName={ 'login-modal-paper' }
          titleClassName={ 'login-modal-title' }
        >
          <img src={ logo } alt='wimo logo' className='login-logo' />
          <TextField
            className='login-textfield'
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
            value={ this.state.email }
            hintText='Password'
          />
          <RaisedButton
            className='log-in-button'
            label='Log in with email address'
            primary={ true }
            onTouchTap={ this.handleClose }
          />
        </Dialog>
      </div>
    )
  }
}
