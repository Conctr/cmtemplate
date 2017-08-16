import React from 'react'
import MuiThemeProvider from '../../styles/WimoThemeProvider'
import Button from 'material-ui/FlatButton'

export default function FlatButton(props) {

  return (
    <MuiThemeProvider>
      <Button
        {...props} 
      />
    </MuiThemeProvider>
  )
}
