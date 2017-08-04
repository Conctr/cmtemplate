import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'

export default function RaisedButton({
  className,
  buttonColor,
  label,
  labelColour,
  href
}) {
  return (
    <MuiThemeProvider>
      <RaisedButton>
        className={ className }
        buttonColor={ buttonColor }
        label={ label }
        labelColor={ labelColor }
        href={ href } />
    </MuiThemeProvider>
  )
}
