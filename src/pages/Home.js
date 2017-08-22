import React, { Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { Tabs, Tab } from 'material-ui/Tabs'
import ClusterIcon from 'react-icons/lib/ti/flow-children'
import DevicesIcon from 'react-icons/lib/go/circuit-board'
import NewClusterModal from '../components/organisms/NewClusterModal'
import DevicesPaper from '../components/organisms/DevicesPaper'
import ClustersGrid from '../components/organisms/ClustersGrid'

class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      devicesData: null,
      value: 'devices',
      clusters: [],
      rules: null
    }
  }
  handleChange = (value) => {
    this.setState({
      value: value
    });
  };

  handleAddCluster = (cluster) => {
    this.setState({clusters: this.state.clusters.concat(cluster)})
  }

  handleDeleteCluster = (clusterId) => {
    this.setState({clusters: this.state.clusters.filter(cluster => {
      return cluster.id !== clusterId
    })})
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
          <DevicesPaper handleError={this.props.handleError}/>
        ) : this.state.value === 'clusters' ? (
          <div>
            <h1>Clusters</h1>
            {this.state.rules && JSON.stringify(this.state.rules)}
            {this.state.clusters ? (
              <div>
                <NewClusterModal
                  deviceIds={
                    this.state.devicesData.data.map(device => (
                      device.device_id
                    ))
                  }
                  addCluster={this.handleAddCluster}
                />
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
              <CircularProgress />
            )}
          </div>
        ) : (
          false
        )}
      </div>
    )
  }
}

export default HomePage
