import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/RaisedButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from '../atoms/TextField.js'
import logo from '../../imgs/wimo-logo.svg'

export default class RegistrationModal extends React.Component{

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
          primary={ true }
        />
        <Dialog
          actions={ actions }
          modal={ true }
          open={ this.state.open }
          actionsContainerClassName='login-modal-actions'
          bodyClassName='login-modal-body'
          contentClassName='register-modal-content'
          overlayClassName='login-modal-overlay'
          paperClassName='login-modal-paper'
          titleClassName='login-modal-title'
        >
          <img src={ logo } alt='wimo logo' className='login-logo' />
          <h2>User Registration</h2>
          <TextField
            className='modal-textfield'
            id='firstName'
            floatingLabelText='First Name'
            fullWidth={ true }
            onChange={ this.onInputChange }
            onEnterKeyDown={
              () => this.submitToAuth(this.props.onSignIn)
            }
            value={ this.state.email }
            hintText='First Name'
          />
          <TextField
            className='modal-textfield'
            id='lastName'
            floatingLabelText='Last Name'
            fullWidth={ true }
            onChange={ this.onInputChange }
            onEnterKeyDown={
              () => this.submitToAuth(this.props.onSignIn)
            }
            value={ this.state.email }
            hintText='Last Name'
          />
          <br />
          <br />
          <FlatButton
            className='log-in-button'
            label='Next'
            primary={ false }
            onTouchTap={ this.handleClose }
          />
        </Dialog>
      </div>
    )
  }
}
