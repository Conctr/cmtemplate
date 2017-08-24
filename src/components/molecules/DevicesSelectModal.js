import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import DevicesList from './DevicesList'
import ListIcon from 'react-icons/lib/fa/align-justify'

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
            icon={<ListIcon />}
            label={!this.props.selectedDevice ? 'Choose Device' : `Device:${selectedDeviceData.name ? (selectedDeviceData.name) : (selectedDeviceData.device_id)}`}
            onTouchTap={ this.handleOpen }
          />
        </div>
        <Dialog
          title='Choose Device'
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
