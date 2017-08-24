import React, { Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import Paper from 'material-ui/Paper'
import DevicesSelectModal from '../molecules/DevicesSelectModal'
import Device from './Device'
import { getAll as getAllDevices } from '../../api/device'

export default class DevicePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devicesData: null,
      selectedDevice: '30000c2a690cc6be'
    }
  }

  componentDidMount() {
    getAllDevices()
    .then(res =>{
      this.setState({ devicesData: res.data })
    })
  }

  handleDeviceSelect = (selectedDevice) => {
    this.setState({ selectedDevice: selectedDevice })
  }

  render() {
    return (
      <div style={{
        width: '95%',
        margin: 'auto',
        marginTop: '2.5%',
        marginBottom: '2.5%'
      }}>
        { this.state.devicesData ? (
          <div>
            <Paper
            zDepth={ 1 }>
            <br/>
            <DevicesSelectModal
              selectedDevice={ this.state.selectedDevice }
              devicesData={ this.state.devicesData }
              selectDevice={ this.handleDeviceSelect }
            />
            { this.state.selectedDevice ? (
              <Device
                deviceId={ this.state.selectedDevice }
                handleError={ this.props.handleError }
              />
            ) : (
              <h1>Please select a device</h1>
            )}
            </Paper>
          </div>
        ) : (
          <CircularProgress/>
        )}
      </div>
    )
  }
}
