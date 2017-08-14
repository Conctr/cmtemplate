import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from '../styles/WimoThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import {Tabs, Tab} from 'material-ui/Tabs'
import ClusterIcon from 'react-icons/lib/ti/flow-children'
import DevicesIcon from 'react-icons/lib/go/circuit-board'
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import MobileTearSheet from '../components/molecules/MobileTearSheet';
import NewClusterModal from '../components/organisms/NewClusterModal';
import {GridList, GridTile} from 'material-ui/GridList'
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
      value: 'devices',
      clusters: [],
      rules: null
      /* {
        id: someId,
        name: clusterName,
        img: imgPath,
        rules: clusterRules,
      } */
    }
  }
  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  handleAddCluster = (cluster) => {
    this.setState({clusters: this.state.clusters.concat(cluster)})
  }

  handleDeleteCluster = (clusterId) => {
    // console.log('haiiii')
    this.setState({clusters: this.state.clusters.filter(cluster => {
      return cluster.id !== clusterId
    })})
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
            <h1>Clusters</h1>
            {this.state.rules && JSON.stringify(this.state.rules)}
            {this.state.clusters ? (
              <div>
                <NewClusterModal deviceIds={this.state.devicesData.data.map(device => (device.device_id))} addCluster={this.handleAddCluster}/>
                {this.state.clusters.length > 0 ? (
                  <div className='clusters'>
                    <MuiThemeProvider>
                      <GridList
                        cellHeight={180}
                        cols={3}
                        style={{width: '100%', height: 450, overflowY: 'auto'}}
                        >
                        <Subheader>Clusters</Subheader>
                      {this.state.clusters.map(cluster => (
                        <GridTile
                          style={{backgroundColor: 'black'}}
                          key={cluster.id}
                          titleBackground="rgba(0,0,0,0.8)"
                          titleStyle={{fontSize: '1.5em'}}
                          title={cluster.name}
                          subtitle={<span>Devices Count:<b>{Math.floor(Math.random() * (10 - 1))}</b></span>}
                          actionIcon={<div style={{marginRight: '10px'}}>
                            <RaisedButton
                              style={{marginRight: '10px'}}
                              onTouchTap={() => {
                                this.setState({rules: cluster.rules})}}
                              label='View'/>
                            <RaisedButton
                              onTouchTap={() => this.handleDeleteCluster(cluster.id)}
                              style={{marginRight: '10px'}}
                              label='Delete'/>
                          </div>}
                        >
                          <img style={{backgroundSize: 'cover'}} src={`${cluster.imgPath}`} alt="wine bottle"/>
                        </GridTile>
                      ))}
                      </GridList>
                    </MuiThemeProvider>
                  </div>
                ) : (
                  <h1>No clusters saved</h1>
                )}
              </div>
            ) : (
              <MuiThemeProvider><CircularProgress /></MuiThemeProvider>
            )}
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
