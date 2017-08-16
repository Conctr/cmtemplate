import React from 'react'
import MuiThemeProvider from '../../styles/WimoThemeProvider'
import Checkbox from 'material-ui/Checkbox'

export default function Chkbox(props) {

  return (
    <MuiThemeProvider>
      <Checkbox
        {...props}
      />
    </MuiThemeProvider>
  )
}
