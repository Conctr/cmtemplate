import React, { Component } from 'react'
import RuleRow from '../molecules/RuleRow'
import { getAlertSettings as getDeviceAlertSettings } from '../../api/device'
import CircularProgress from 'material-ui/CircularProgress'
import RaisedButton from 'material-ui/RaisedButton'
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
let originalAlertSettings;
function makeNumberStringInt(object) {
  Object.keys(object).forEach(key => {
    Object.keys(object[key]).forEach(condition => {
      let conditionInt = object[key][condition]
      if(parseInt(conditionInt, 10) == conditionInt){
        object[key][condition] = parseInt(conditionInt, 10)
        console.log('conditionInt',conditionInt)
      }
    })
  })
  return object
}

export default class RulesUI extends Component{
  state={
    rules: {},
    loading: true,
    numberTo: '',
    alertMessage: '',
  }

  alertSendSettings;
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

  onInputChange = (e, newValue) => {
    console.log('e',e.target.id)
    this.setState({
      [e.target.id]: newValue
    })
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
      if(rules[key]){
        if(rules[key][condition]){
          delete rules[key][condition]
        }
        if(Object.keys(rules[key]).length === 0 && rules[key].constructor === Object){
          delete rules[key]
        }
      }
    }
    this.setState({rules: rules})
  }

  componentDidMount(){
    getDeviceAlertSettings()
    .then(alertSettings => {
      originalAlertSettings = alertSettings
      this.alertSendSettings = alertSettings.alertSettings
      delete alertSettings.alertSettings
      this.setState({
        rules: alertSettings,
        loading: false,
        numberTo: this.alertSendSettings.to,
        alertMessage: this.alertSendSettings.message,
      })
    })
  }

  resetSettings = () => {
    this.props.resetGraphsShown()
    console.log('this.originalAlertSettings',this.originalAlertSettings.alertSettings)
    // this.setState({
    //   rules: alertSettings,
    //   loading: false,
    //   numberTo: this.alertSendSettings.to,
    //   alertMessage: this.alertSendSettings.message,
    // })
  }

  render() {
    return !this.state.loading ? (
      <div>
        <h3>Alert Settings</h3>
            <div>
              {this.props.keysShown.map(rowPreference => (
                <div key={rowPreference.key}>
                <RuleRow
                onToggle={this.onToggle}
                changeRule={this.changeRule}
                ruleData={this.state.rules[rowPreference.key]}
                title={rowPreference.displayTitle}
                identifier={rowPreference.key}
                />
                <br/>
                </div>
              ))}
            </div>
          <TextField
            id='numberTo'
            floatingLabelText='Phone Number'
            type='number'
            value={this.state.numberTo}
            onChange={this.onInputChange}/>
          <TextField
            id='alertMessage'
            floatingLabelText='Alert Message'
            value={this.state.alertMessage}
            onChange={this.onInputChange}/>
          <br/>
          <RaisedButton onClick={() =>{
            this.props.handleClose()
            this.props.saveSettings({
              ...makeNumberStringInt(this.state.rules),
              alertSettings: {
                from: 'Wimo',
                to: this.state.numberTo,
                message: this.state.alertMessage,
              }
            })
            }} label='Save'/>
          <RaisedButton onClick={this.props.handleClose} label='Cancel'/>
      </div>
    ) : (
      <CircularProgress />
    )
  }
}
