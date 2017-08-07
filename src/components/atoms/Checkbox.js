import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
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

