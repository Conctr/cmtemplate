import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Dialog from 'material-ui/Dialog'
import FlatButton from '../atoms/FlatButton'
import RaisedButton from '../atoms/RaisedButton'
import TextField from '../atoms/TextField'
import ValidatorForm from './ValidatorForm'

export default class ModalLogin extends React.Component{

  state={
    open: false,
    email: '',
    password: ''
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {

    return (
      <MuiThemeProvider>
        <div>
          <RaisedButton
            fullWidth={ true }
            label='log in'
            onTouchTap={ this.handleOpen } />
          <Dialog
            modal={ true }
            open={ this.state.open }
            actionsContainerClassName={ 'login-modal-actions' }
            bodyClassName={ 'login-modal-body' }
            contentClassName={ 'login-modal-content' } 
            overlayClassName={ 'login-modal-overlay' }
            paperClassName={ 'login-modal-paper' }
            titleClassName={ 'login-modal-title' }
          >
          <ValidatorForm 
            on
          />
          { <h4>OR</h4> }
          <RaisedButton
            label='Sign in with Google'
            fullWidth={ true }
            primary={ true }
            onTouchTap={ this.handleClose }
          />
          <br />
          <RaisedButton
            label='Cancel'
            fullWidth={ true }
            primary={ true }
            onTouchTap={ this.handleClose }
          />
          </Dialog>
        </div>
      </MuiThemeProvider>
    )
  }
}
