import React from 'react'
import DevicesList from './DevicesList'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import ButtonIcon from 'react-icons/lib/fa/caret-down'

export default class SelectDevices extends React.Component {

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

    let selectedDeviceData = this.props.devicesData.find(
      device => (
        device.device_id === this.props.selectedDevice
      )
    )

    return (
      <div>
        <div style={{width: '30%',marginLeft: 'auto',marginRight: 'auto'}}>
          <RaisedButton
            fullWidth={ true }
            labelPosition="before"
            icon={<ButtonIcon />}
            label={!this.props.selectedDevice ? 'Click to Choose Device' : `Device:${selectedDeviceData.name ? (selectedDeviceData.name) : (selectedDeviceData.device_id)}`}
            onTouchTap={ this.handleOpen }
          />
        </div>
        <Dialog
          title='Registered Devices'
          actions={ actions }
          modal={ true }
          open={ this.state.open }
        >
          <DevicesList
            devicesData={this.props.devicesData}
            selectDevice={this.props.selectDevice}
            handleModalClose={this.handleClose}
          />
        </Dialog>
      </div>
    )
  }
}
