import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ClusterRuleCell from './ClusterRuleCell';

export default class ClusterRuleRow extends Component{

 constructor (props){
   super(props);
   this.items = [];
 }

  handleAdd = (item) =>{
    this.items.push(item);
  }

  render() {
    return (
      <MuiThemeProvider>
        <Toolbar className='cluster-rule-row'>
           <ToolbarTitle text={this.props.title}/>
           <ToolbarSeparator />
           <ToolbarGroup className='cluster-rule-row-group'>
               <ClusterRuleCell
                 removeClusterRule={this.props.removeClusterRule}
                 checkClusterRule={this.props.checkClusterRule}
                 identifier={this.props.identifier}
                 addItems={this.handleAdd}
                 condition={'lt'} text={'min'}/>
               <ClusterRuleCell
                 removeClusterRule={this.props.removeClusterRule}
                 checkClusterRule={this.props.checkClusterRule}
                 identifier={this.props.identifier}
                 addItems={this.handleAdd}
                 condition={'gt'} text={'max'}/>
           </ToolbarGroup>
      </Toolbar>
      </MuiThemeProvider>
    )
  }
}
