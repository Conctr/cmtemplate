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
      selectedDevice: null
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
      <div className='device-select-container'>
        { this.state.devicesData ? (
          <div >
            <Paper zDepth={ 1 }>
              <div className='device-select-content'>
                { !this.state.selectedDevice ? (
                  <h1 className='device-select-prompt'>
                    Please select a device
                  </h1>
                ) : (
                  false
                )}
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
                  false
                )}
              </div>
            </Paper>
          </div>
        ) : (
          <CircularProgress/>
        )}
      </div>
    )
  }
}
