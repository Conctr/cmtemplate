import React, { Component } from 'react';
import MuiThemeProvider from '../styles/WimoThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import {Tabs, Tab} from 'material-ui/Tabs'
import ClusterIcon from 'react-icons/lib/ti/flow-children'
import DevicesIcon from 'react-icons/lib/go/circuit-board'
import NewClusterModal from '../components/organisms/NewClusterModal';
import DevicesList from '../components/organisms/DevicesList';
import ClustersGrid from '../components/organisms/ClustersGrid';

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
    console.log('clusters',this.state.clusters)
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
              <DevicesList devicesData={this.state.devicesData}/>
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
                  <ClustersGrid
                    addCluster={this.handleAddCluster}
                    deleteCluster={this.handleDeleteCluster}
                    clusters={this.state.clusters}
                    />
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
