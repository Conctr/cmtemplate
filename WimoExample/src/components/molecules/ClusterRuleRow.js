import React, { Component } from 'react'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import ClusterRuleCell from './ClusterRuleCell'

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
      <Toolbar style={{width: '100%'}}>
         <ToolbarTitle text={this.props.title}/>
         <ToolbarSeparator />
         <ToolbarGroup style={{display: 'flex',flexDirection: 'row'}}>
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
    )
  }
}
