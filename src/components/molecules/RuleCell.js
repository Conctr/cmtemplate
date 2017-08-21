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

  componentDidMount(){
    let returnVal = ''
    if(this.props.cellData) {
      returnVal = this.props.cellData
    }
    this.setState({
      enabled: !!this.props.cellData,
      value: returnVal
    })
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <div style={{width: '50px'}}>
          <MuiThemeProvider>
            <Toggle
            defaultToggled={this.state.enabled}
            onToggle={(e,inputChecked) =>
              this.props.onToggle(this.props.identifier,this.props.condition,inputChecked)
            }
            />
          </MuiThemeProvider>
        </div>
        <div>
          <MuiThemeProvider>
            <TextField
              onChange={(event,newValue) => this.props.changeRule(this.props.identifier,this.props.condition,newValue)}
              style={{width: '40px'}}
              disabled={!this.state.enabled}
              floatingLabelText={this.props.text}
              disabled={this.state.enabled}
            />
          </MuiThemeProvider>
        </div>
      </div>
    )
  }
}

export default ClusterRuleCell
