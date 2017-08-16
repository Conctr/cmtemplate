import React from 'react'
import MuiThemeProvider from '../../styles/WimoThemeProvider'
import Dialog from 'material-ui/Dialog'
import FlatButton from '../atoms/FlatButton'
import RaisedButton from '../atoms/RaisedButton'
import DevicesList from './DevicesList'

export default class SelectDevices extends React.Component{

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
        label='Close'
        primary={ true }
        onTouchTap={ this.handleClose }
      />
    ]

    return (
      <MuiThemeProvider>
        <div>
          <div style={{width: '30%',marginLeft: 'auto',marginRight: 'auto'}}>
            <RaisedButton
              fullWidth={ true }
              label={!this.props.selectedDevice ? 'Choose Device' : `Device:${this.props.selectedDevice}`}
              onTouchTap={ this.handleOpen } />
          </div>
          <Dialog
            title='Choose Device'
            actions={ actions }
            modal={ true }
            open={ this.state.open }>
            <DevicesList
            devicesData={this.props.devicesData}
            selectDevice={this.props.selectDevice}
            handleModalClose={this.handleClose}/>
          </Dialog>
        </div>
      </MuiThemeProvider>
    )
  }
}
