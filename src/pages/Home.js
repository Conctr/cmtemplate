

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import {Tabs, Tab} from 'material-ui/Tabs'
import ClusterIcon from 'react-icons/lib/ti/flow-children'
import DevicesIcon from 'react-icons/lib/go/circuit-board'

class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      devicesData: null,
      value: 'devices'
    }
  }
  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  componentDidMount(){
    this.props.getDevicesData()
    .then(data => {
      this.setState({devicesData: data})
    })
    .catch(err =>{
      this.setState({error: err})
    })
  }
  render() {
    return (
      <div>
        <button onClick={()=> {this.props.onSignOut()}}>Sign Out</button>
        <br/>
        {this.state.value === 'welcome' ? (
          <div>
            <h1>Welcome!</h1>
            <p>Please select devices or clusters to continue</p>
          </div>
        ) : this.state.value === 'devices' ? (
          <div>
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
        ) : this.state.value === 'clusters' ? (
          <div>
            <h1>Cluster</h1>
            <p>All these clustes</p>
          </div>
        ) : (
          <h1>I dunno</h1>
        )}
            <div style={{position: 'fixed',top: '0',width: '100%',height: '100%'}}>
              <MuiThemeProvider>
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  >
                  <Tab
                    value="devices"
                    label="My Devices"
                    icon={<DevicesIcon/>}
                  />
                  <Tab
                    value="clusters"
                    label="My Clusters"
                    icon={<ClusterIcon/>}
                  />
                </Tabs>
              </MuiThemeProvider>
            </div>
      </div>
    )
  }
}

export default HomePage
