import React from 'react'
import Chip from '../atoms/Chip'
import {red50} from 'material-ui/styles/colors';


export default function CustomTable(props) {
  return (<div className='chip-container'>
    {props.sortedGraphs.map(graph =>(
      <div key={graph.key}>
      {graph.display ? (
        <Chip
        className='display-true'
        labelColor={red50}
        style={{backgroundColor: '#ff9999'}}
        onRequestDelete={() => props.handleGraphDelete(graph.key)}>
          {graph.displayTitle}
        </Chip>
      ) : (
        <Chip
        className='display-false'
        onTouchTap={() => props.handleGraphAdd(graph.key)}>
          {graph.displayTitle}
        </Chip>
      )}
      </div>
    ))}
  </div>)
}
