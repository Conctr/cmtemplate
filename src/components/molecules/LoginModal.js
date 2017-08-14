import React from 'react'
import MuiThemeProvider from '../../styles/WimoThemeProvider'
import Dialog from 'material-ui/Dialog'
import FlatButton from '../atoms/FlatButton'
import RaisedButton from '../atoms/RaisedButton'

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
        label='Log in with email address'
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
            label='login'
            onTouchTap={ this.handleOpen } />
          <Dialog
            title='Log in!'
            actions={ actions }
            modal={ true }
            open={ this.state.open }
            actionsContainerClassName={ 'login-modal-actions' }
            bodyClassName={ 'login-modal-body' }
            contentClassName={ 'login-modal-content' } 
            overlayClassName={ 'login-modal-overlay' }
            paperClassName={ 'login-modal-paper' }
            titleClassName={ 'login-modal-title' } >
          </Dialog>
        </div>
      </MuiThemeProvider>
    )
  }
}
