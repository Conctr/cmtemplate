import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField'

class ClusterRuleCell extends Component{

  constructor(props) {
    super(props);
    this.state = {
      enabled: false,
      value: ''
    }
  }

  handleToggleChange = (event,changedBool) => {
    this.setState({
      enabled: changedBool
    })
  }

  render() {

    if(this.state.enabled && this.state.value){
      this.props.checkClusterRule(this.props.identifier,this.props.condition,this.state.value);
    } else if(!this.state.enabled) {
      this.props.removeClusterRule(this.props.identifier,this.props.condition)
    }

    return (
      <div className='cluster-rule-cell'>
      <div className='cluster-rule-cell-v'>
      <MuiThemeProvider>
        <Toggle
        defaultToggled={this.state.enabled}
        onToggle={this.handleToggleChange}
        />
      </MuiThemeProvider>
      </div>
      <div >
      <MuiThemeProvider>
        <TextField
          onChange={(event,newValue) => {this.setState({value: newValue})}}
          className='text-field-cluster'
          floatingLabelText={this.props.text}
          disabled={!this.state.enabled}
        />
      </MuiThemeProvider>
      </div>
      </div>
    )
  }
  componentWillUnmount() {
    if(this.state.enabled && this.state.value){
      this.props.addItems({condition: this.props.condition,value: this.state.value});
    }
  }
}

export default ClusterRuleCell
