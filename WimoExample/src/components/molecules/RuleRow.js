import React, { Component } from 'react'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RuleCell from './RuleCell';

export default class RuleRow extends Component{

  render() {
    return (
      <Toolbar style={{backgroundColor: 'white',width: '100%'}}>
        <ToolbarTitle style={{fontSize: '1em'}} text={`${this.props.title}(${this.props.unit})`}/>
        <ToolbarSeparator />
        <ToolbarGroup style={{backgroundColor: 'white',display: 'flex',flexDirection: 'row'}}>
          <RuleCell
            changeRule={this.props.changeRule}
            onToggle={this.props.onToggle}
            identifier={this.props.identifier}
            cellData={this.props.ruleData ? this.props.ruleData['LT'] : null}
            condition={'LT'}
            text={'min'}
          />
          <RuleCell
            changeRule={this.props.changeRule}
            onToggle={this.props.onToggle}
            cellData={this.props.ruleData ? this.props.ruleData['GT'] : null}
            identifier={this.props.identifier}
            condition={'GT'}
            text={'max'}
          />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
