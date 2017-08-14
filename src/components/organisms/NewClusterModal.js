import React, { Component } from 'react'
import ClusterRuleRow from '../molecules/ClusterRuleRow'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Dialog from 'material-ui/Dialog'
import FlatButton from '../atoms/FlatButton'
import RaisedButton from '../atoms/RaisedButton'
import TextField from 'material-ui/TextField'
import shortid from 'shortid'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


class NewClusterModal extends Component{
  state={
    open: false,
    clusterName: null,
    imgPath: null
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
  }
  removeClusterRule = (identifier,condition) => {
    if(this.clusterRules[identifier]){
      if(this.clusterRules[identifier][condition]){
        delete this.clusterRules[identifier][condition]
      }
    }
    if(!this.clusterRules[identifier]){
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
      />,
      <FlatButton
        label='Add Cluster'
        primary={ true }
        onTouchTap={ () => {
          this.props.addCluster({
            id: shortid.generate(),
            name: this.state.clusterName,
            imgPath: this.state.imgPath,
            rules: this.clusterRules,
          })
          this.handleClose()
        } }
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
            <TextField
              floatingLabelText='Cluster Name'
              onChange={
                (event,newString) => {
                  this.setState({clusterName: newString})}
              }/>
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
            <Table
              multiSelectable={true}
              >
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Device ID</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                deselectOnClickaway={false}
                >
                {this.props.deviceIds.map(deviceId => (
                  <TableRow key={deviceId}>
                    <TableRowColumn>{deviceId}</TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TextField
              floatingLabelText='Img path'
              onChange={
                (event,newString) => {
                  this.setState({imgPath: newString})
                }
                }/>
          </Dialog>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default NewClusterModal
