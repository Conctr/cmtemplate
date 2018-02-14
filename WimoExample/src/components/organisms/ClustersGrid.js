import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import {GridList, GridTile} from 'material-ui/GridList'

export default class DevicePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clusters: this.props.clusters
    }
  }

  render() {
    return (
      <div className='clusters'>
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
                label='View'/>
              <RaisedButton
                onTouchTap={() => this.props.deleteCluster(cluster.id)}
                style={{marginRight: '10px'}}
                label='Delete'/>
            </div>}
          >
            <img
            style={{backgroundSize: 'cover'}}
            src={
              cluster.imgPath ? 
              `${cluster.imgPath}` :
              'https://mysticpants.com/_include/img/CONCTR-LOGO-MUSTARD-LINE.png'
            }
            alt="wine bottle"/>
          </GridTile>
        ))}
        </GridList>
      </div>
    )
  }
}
