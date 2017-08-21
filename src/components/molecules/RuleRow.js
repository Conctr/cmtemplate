import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RuleCell from './RuleCell';

export default class RuleRow extends Component{

  render() {
    return (
      <MuiThemeProvider>
        <Toolbar style={{width: '100%'}}>
        <ToolbarTitle text={this.props.title}/>
        <ToolbarSeparator />
        <ToolbarGroup style={{display: 'flex',flexDirection: 'row'}}>
            <RuleCell
              changeRule={this.props.changeRule}
              onToggle={this.props.onToggle}
              identifier={this.props.identifier}
              cellData={this.props.ruleData ? this.props.ruleData['LT'] : null}
              condition={'LT'}
              text={'min'}/>
            <RuleCell
              changeRule={this.props.changeRule}
              onToggle={this.props.onToggle}
              cellData={this.props.ruleData ? this.props.ruleData['GT'] : null}
              identifier={this.props.identifier}
              condition={'GT'}
              text={'max'}/>
        </ToolbarGroup>
      </Toolbar>
      </MuiThemeProvider>
    )
  }
}
