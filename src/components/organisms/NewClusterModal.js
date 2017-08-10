import React, { Component } from 'react'
import ClusterRuleRow from '../molecules/ClusterRuleRow'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Dialog from 'material-ui/Dialog'
import FlatButton from '../atoms/FlatButton'
import RaisedButton from '../atoms/RaisedButton'


class NewClusterModal extends Component{
  state={
    open: true
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  clusterRules = {}
  checkClusterRule = (identifier,condition,value) => {
    if(this.clusterRules[identifier] == null){
      this.clusterRules[identifier] = {}
    }
    this.clusterRules[identifier][condition] = value
    console.log(this.clusterRules)
  }
  removeClusterRule = (identifier,condition) => {
    if(this.clusterRules[identifier]){
      if(this.clusterRules[identifier][condition]){
        delete this.clusterRules[identifier][condition]
      }
    }
    if(this.clusterRules[identifier]){
      delete this.clusterRules[identifier]
    }
  }
  /*
  {
    "_ts":{ "gt": time, "lt": time},
    "temperature":{ "gt": temp, "lt": temp},
    "humidity":{ "gt": humidity, "lt": humidity}
  }
  */

  render() {
    const actions = [
      <FlatButton
        label='Exit'
        primary={ true }
        onTouchTap={ this.handleClose }
      />
    ]

    const clusterRuleRows = [{
      title: "Temperature",
      identifier: 'temperature'
    },{
      title: "Humidity",
      identifier: 'humidity'
    },{
      title: "Pressure",
      identifier: 'pressure'
    }]

    return (
      <MuiThemeProvider>
        <div>
          <RaisedButton
            fullWidth={ true }
            label='Create New Cluster'
            onTouchTap={ this.handleOpen } />
          <Dialog
            title='Create New Cluster'
            actions={ actions }
            modal={ true }
            open={ this.state.open }
            >
            {clusterRuleRows.map(rowPreference => (
              <div key={rowPreference.identifier}>
              <ClusterRuleRow
              removeClusterRule={this.removeClusterRule}
              checkClusterRule={this.checkClusterRule}
              title={rowPreference.title}
              identifier={rowPreference.identifier}
              />
              <br/>
              </div>
            ))}
          </Dialog>
        </div>
      </MuiThemeProvider>
    )
  }

  componentWillUnmount() {
    console.log('unmounted')
  }
}

export default NewClusterModal
