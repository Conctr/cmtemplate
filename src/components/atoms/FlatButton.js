import React from 'react'
import MuiThemeProvider from '../../styles/WimoThemeProvider'
import Button from 'material-ui/FlatButton'

export default function FlatButton ({
  buttonColor,
  href,
  label,
  labelColor,
  onTouchTap

}) {
  return (
    <MuiThemeProvider>
      <Button
        buttonColor={ buttonColor }
        href={ href }
        label={ label }
        labelColor={ labelColor }
        onTouchTap={ onTouchTap } />
    </MuiThemeProvider>
  )
}
