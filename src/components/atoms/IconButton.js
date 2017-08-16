import React from 'react'
import MuiThemeProvider from '../../styles/WimoThemeProvider'
import Button from 'material-ui/IconButton'

export default function IconButton(props) {

  return (
    <MuiThemeProvider>
      <Button
        { ...props }
      />
    </MuiThemeProvider>
  )
}
