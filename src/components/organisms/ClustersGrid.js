import React, { Component } from 'react';
import MuiThemeProvider from '../../styles/WimoThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import {GridList, GridTile} from 'material-ui/GridList'

class DevicePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clusters: this.props.clusters
    }
  }

  render() {
    return (
      <div className='clusters'>
        <MuiThemeProvider>
          <GridList
            cellHeight={180}
            cols={3}
            className='grid-list'
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
                  className='grid-raised-button'
                  label='View'/>
                <RaisedButton
                  onTouchTap={() => this.props.deleteCluster(cluster.id)}
                  className='grid-raised-button'
                  label='Delete'/>
              </div>}
            >
              <img
              className='img-grid-raised-button'
              src={
                cluster.imgPath ?
                `${cluster.imgPath}` :
                'https://mysticpants.com/_include/img/CONCTR-LOGO-MUSTARD-LINE.png'
              }
              alt="wine bottle"/>
            </GridTile>
          ))}
          </GridList>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default DevicePage
