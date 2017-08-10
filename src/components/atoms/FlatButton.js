import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
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
        backgroundColor={ buttonColor }
        href={ href }
        label={ label }
        labelStyle={{color: labelColor}}
        onTouchTap={ onTouchTap } />
    </MuiThemeProvider>
  )
}
