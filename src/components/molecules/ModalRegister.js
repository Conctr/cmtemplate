import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Dialog from 'material-ui/Dialog'
import FlatButton from '../atoms/FlatButton'
import RaisedButton from '../atoms/RaisedButton'
import TextField from '../atoms/TextField'
import ValidatorForm from './ValidatorForm'

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
        label='Log in'
        primary={ true }
        onTouchTap={ this.handleClose }
      />,
      <FlatButton
        label='Log in with Google'
        primary={ true }
        onTouchTap={ this.handleClose }
      />,
      <FlatButton
        label='Cancel'
        primary={ false }
        onTouchTap={ this.handleClose }
      />
    ]

    return (
      <MuiThemeProvider>
        <div>
          <RaisedButton
            fullWidth={ true }
            label='Register'
            onTouchTap={ this.handleOpen } />
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
          { <h4>Sign in with email address </h4> }
          <ValidatorForm />
          { <h4>OR</h4> }
           
          </Dialog>
        </div>
      </MuiThemeProvider>
    )
  }
}
