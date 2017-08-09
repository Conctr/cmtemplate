import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import CircularProgress from 'material-ui/CircularProgress'
import NavBar from '../components/molecules/NavBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class DevicePage extends Component {
  constructor(props) {
    super(props);
    this.state = {devicesData: null}
  }
  render() {
    return (
      <div style={{textAlign: 'center', marginLeft: 'auto',marginRight: 'auto'}}>
      {!!this.state.devicesData ? this.state.devicesData.data.map(device => (
        <div key={device.device_id}>
        <h1>{device.device_id}</h1>
        <p>{device.avatar}</p>
        <p>{device.model_id}</p>
        <p>{device.last_online}</p>
        <Link to={`/devices/${device.device_id}`}>
          Go To Device
        </Link>
        </div>
      )) :  <MuiThemeProvider><CircularProgress /></MuiThemeProvider>}
      </div>
    )
  }
  componentDidMount(){
    this.props.getDevicesData()
    .then(data => {
      this.setState({devicesData: data})
    })
    .catch(err =>{
      this.setState({error: err})
    })
  }
}

export default DevicePage
