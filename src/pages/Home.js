import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import {Tabs, Tab} from 'material-ui/Tabs'
import ClusterIcon from 'react-icons/lib/ti/flow-children'
import DevicesIcon from 'react-icons/lib/go/circuit-board'
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import MobileTearSheet from '../components/molecules/MobileTearSheet';
import moment from 'moment'
require('moment-duration-format')

/* <div key={device.device_id}>
<h1>{device.device_id}</h1>
<p>{device.avatar}</p>
<p>{device.model_id}</p>
<p>{device.last_online}</p>
<Link to={`/devices/${device.device_id}`}>
  Go To Device
</Link>
</div> */

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
        {this.state.value === 'welcome' ? (
          <div>
            <h1>Welcome!</h1>
            <p>Please select devices or clusters to continue</p>
          </div>
        ) : this.state.value === 'devices' ? (
          <div>
            {this.state.devicesData ? (
              <div style={{paddingTop: '30px'}}>
                <MuiThemeProvider>
                  <MobileTearSheet>
                    <div id='asdf'>
                      <List>
                        <Subheader>Devices</Subheader>
                          {this.state.devicesData.data.map(device => (
                            <ListItem
                              leftAvatar={<RaisedButton href={`/devices/${device.device_id}`}label="View"/>}
                              primaryText={device.device_id}
                              key={device.device_id}
                              // primaryTogglesNestedList={true}
                              nestedListStyle={{backgroundColor: '#d3d3d3'}}
                              nestedItems={[<div key='device_model'>{
                                    [<h5 key='header_device_model'>Device model</h5>,
                                    <p key='value_device_model'>{device.model_id}</p>]
                                    }
                                </div>,
                                <div key='time'>{
                                    [<h5 key='header_time'>Last Online(time)</h5>,
                                    <p key='value_time_hours'>{moment(device.last_online).format("h:m A")}</p>,
                                    <p key='value_time_further'>{moment(device.last_online).format("MMMM Do YYYY")}</p>]
                                    }
                                </div>,
                                <div key='time_ago'>{
                                    [<h5 key='header_time_ago'>Last Online(ago)</h5>,
                                    <p key='value_time_ago'>{
                                        moment
                                        .duration(moment().diff(moment(device.last_online)))
                                        .format('M [months],w [week],d [days],h [hrs], m [min] ago')
                                      }</p>]
                                    }
                                </div>
                              ]}
                            />
                        ))}
                      </List>
                    </div>
                  </MobileTearSheet>
                </MuiThemeProvider>
              </div>
            ) :  <MuiThemeProvider><CircularProgress /></MuiThemeProvider>}
          </div>
        ) : this.state.value === 'clusters' ? (
          <div>
            <h1>Cluster</h1>
            <p>All these clustes</p>
          </div>
        ) : (
          <h1>I dunno</h1>
        )}
            <div style={{position: 'fixed',bottom: '0',width: '100%'}}>
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
