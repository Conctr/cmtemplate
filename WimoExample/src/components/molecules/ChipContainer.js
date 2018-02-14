import React from 'react'
import Chip from 'material-ui/Chip'

export default function CustomTable(props) {
  return (<div className='chip-container'>
    { props.sortedGraphs.map(graph =>(
      <div key={graph.key}>
      { graph.display ? (
        <Chip
          className='display-true'
          onRequestDelete={() => props.handleGraphDelete(graph.key)}
        >
          {graph.displayTitle}
        </Chip>
      ) : (
        <Chip
          className='display-false'
          onTouchTap={ () => props.handleGraphAdd(graph.key) }
          style={{
            backgroundColor: '#fff',
            border: '0.5px solid #fbeeee'
          }}
        >
          { graph.displayTitle }
        </Chip>
      )}
      </div>
    ))}
  </div>)
}
