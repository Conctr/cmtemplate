import React from 'react'
import MuiThemeProvider from '../../styles/WimoThemeProvider'
import { Checkbox as Chkbox } from 'material-ui' 

export default function Checkbox({
  label,
  labelPosition
}) {
  return (
    <MuiThemeProvider>
      <Chkbox
        label={ label }
        labelPosition={ labelPosition } />
    </MuiThemeProvider>
  )
}

