import React, { Component } from 'react'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'

export default class ClusterRuleCell extends Component{

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
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}>
      <div style={{width: '50px'}}>
        <Toggle
        defaultToggled={this.state.enabled}
        onToggle={this.handleToggleChange}
        />
      </div>
      <div >
        <TextField
          onChange={(event,newValue) => {this.setState({value: newValue})}}
          style={{width: '40px'}}
          floatingLabelText={this.props.text}
          disabled={!this.state.enabled}
        />
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
