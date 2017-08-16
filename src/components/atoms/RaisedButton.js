import React from 'react'
import MuiThemeProvider from '../../styles/WimoThemeProvider'
import Button from 'material-ui/RaisedButton'

export default function RaisedButton(props) {
  return (
    <MuiThemeProvider>
      <Button
        {...props} />
    </MuiThemeProvider>
  )
}
