import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Checkbox from 'material-ui/checkbox' 

export default function Checkbox({
  label 
}) {
  return (
    <MuiThemeProvider>
      <CheckBox
        label={ label } />
    </MuiThemeProvider>
  )
}

