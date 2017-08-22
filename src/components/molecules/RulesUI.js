import React, { Component } from 'react'
import RuleRow from '../molecules/RuleRow'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from '../atoms/RaisedButton'
import TextField from 'material-ui/TextField'

const ruleRows = [{
  title: "Temperature",
  identifier: 'temperature'
},{
  title: "Humidity",
  identifier: 'humidity'
},{
  title: "Pressure",
  identifier: 'pressure'
}]

export default class RulesUI extends Component{
  state={
    rules: {"temperature":{"LT":"23","GT":"32"},"humidity":{"GT":"23"},"pressure":{"GT":"21"}}
  }

  /*
  {
    "_ts":{ "gt": time, "lt": time},
    "temperature":{ "gt": temp, "lt": temp},
    "humidity":{ "gt": humidity, "lt": humidity}
  }
  */

  changeRule = (key,condition,value) => {
    // Turn values into such usable format
    let rules = {...this.state.rules}
    if(value){
      if(!rules[key]){
        rules[key] = {}
      }
      rules[key][condition] = value
    } else {
      if(rules[key][condition]){
        delete rules[key][condition]
      }
      if(Object.keys(rules[key]).length === 0 && rules[key].constructor === Object){
        delete rules[key]
      }
    }
    this.setState({rules: rules})
  }
  onToggle = (key,condition,toggleVal,fieldValue) => {
    let rules = {...this.state.rules}
    if(toggleVal){
      if(fieldValue){
        if(!rules[key]){
          rules[key] = {}
        }
        rules[key][condition] = fieldValue
      }
    } else {
      if(rules[key][condition]){
        delete rules[key][condition]
      }
      if(Object.keys(rules[key]).length === 0 && rules[key].constructor === Object){
        delete rules[key]
      }
    }
    this.setState({rules: rules})
  }

  render() {
    console.log('rules',this.state.rules)
    return (
      <MuiThemeProvider>
        <div>
        <h3>Alert Settings</h3>
          {ruleRows.map(rowPreference => (
            <div key={rowPreference.identifier}>
            <RuleRow
            onToggle={this.onToggle}
            changeRule={this.changeRule}
            ruleData={this.state.rules[rowPreference.identifier]}
            title={rowPreference.title}
            identifier={rowPreference.identifier}
            />
            <br/>
            </div>
          ))}
          <TextField
            floatingLabelText='Phone Number'
            type='number'
            onChange={
              (event,newString) => {
                this.setState({imgPath: newString})
              }
            }/>
          <TextField
            floatingLabelText='Message'
            type='number'
            onChange={
              (event,newString) => {
                this.setState({imgPath: newString})
              }
            }/>
          <RaisedButton label='Save Alert Settings'/>
          </div>
      </MuiThemeProvider>
    )
  }
}
