import React, { Component } from 'react';
import MuiThemeProvider from '../../styles/WimoThemeProvider';
import Paper from '../atoms/Paper';
import DevicesSelectModal from '../molecules/DevicesSelectModal';
import Device from './Device';
import CircularProgress from 'material-ui/CircularProgress';
import { getAll as getAllDevices} from '../../api/device';

class DevicePage extends Component {
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
      this.setState({devicesData: res.data})
    })
  }

  handleDeviceSelect = (selectedDevice) => {
    this.setState({selectedDevice: selectedDevice})
  }

  render() {
    return (
      <div style={{width: '80%',margin: 'auto'}}>
        {this.state.devicesData ? (
          <div>
            <Paper
            zDepth={5}>
            <br/>
            <DevicesSelectModal
              selectedDevice={this.state.selectedDevice}
              devicesData={this.state.devicesData}
              selectDevice={this.handleDeviceSelect}/>
            {this.state.selectedDevice ? (
              <Device deviceId={this.state.selectedDevice} handleError={this.props.handleError}/>
            ) : (
              <h1>Please select a device</h1>
            ) }
            </Paper>
          </div>
        ) : (
          <CircularProgress/>
        )}
      </div>
    )
  }
}

export default DevicePage
