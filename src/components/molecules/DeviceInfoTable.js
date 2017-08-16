import React from 'react'
import Table from '../atoms/Table'
import {
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import moment from 'moment'

export default function CustomTable(props) {
  return (
    <Table>
      <TableHeader
        adjustForCheckbox={false}
        displaySelectAll={false}>
       <TableRow>
         <TableHeaderColumn>
           <b>Data Type</b>
         </TableHeaderColumn>
       {props.keysShown.map(keyShown => (
         <TableHeaderColumn key={keyShown.key}>
           {keyShown.displayTitle}
         </TableHeaderColumn>
       ))}
       </TableRow>
     </TableHeader>
     <TableBody
       displayRowCheckbox={false}>
       <TableRow>
         <TableRowColumn>
           <b>Most Recent (time)</b>
         </TableRowColumn>
         {props.keysShown.map(keyShown => (
           <TableRowColumn key={keyShown.key}>
             {moment(props.sortedData[keyShown.key].values[0].ts).format('h:mm A')} <br/>
             {moment(props.sortedData[keyShown.key].values[0].ts).format('D/M/YYYY')}
           </TableRowColumn>
         ))}
       </TableRow>
       <TableRow>
         <TableRowColumn>
           <b>Most Recent (value)</b>
         </TableRowColumn>
         {props.keysShown.map(keyShown => (
           <TableRowColumn key={keyShown.key}>
             {props.sortedData[keyShown.key].values[0].value}
           </TableRowColumn>
         ))}
       </TableRow>
       <TableRow>
         <TableRowColumn>
           <b>Minimum</b>
         </TableRowColumn>
         {props.keysShown.map(keyShown => (
           <TableRowColumn key={keyShown.key}>
             {props.sortedData[keyShown.key].rangeY.min}
           </TableRowColumn>
         ))}
       </TableRow>
       <TableRow>
         <TableRowColumn>
           <b>Maximum</b>
         </TableRowColumn>
         {props.keysShown.map(keyShown => (
           <TableRowColumn key={keyShown.key}>
             {props.sortedData[keyShown.key].rangeY.max}
           </TableRowColumn>
         ))}
       </TableRow>
     </TableBody>
    </Table>
  )
}
