import React from 'react'
import WimoThemeProvider from '../../styles/WimoThemeProvider'
import Chip from 'material-ui/Chip';

export default function Checkbox(props) {
  let mutableProps = {...props}
  let children = mutableProps.children
  delete mutableProps.children
  return (
      <Chip {...props}>
        {children}
      </Chip>
  )
}
