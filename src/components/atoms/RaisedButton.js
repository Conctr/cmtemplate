import React from 'react'
import MuiThemeProvider from '../../styles/WimoThemeProvider'
import Button from 'material-ui/RaisedButton'

export default function RaisedButton({
  className,
  fullWidth,
  href,
  label,
  onTouchTap

}) {
  return (
    <MuiThemeProvider>
      <Button
        className={ className }
        fullWidth={ fullWidth }
        href={ href } 
        label={ label }
        onTouchTap={ onTouchTap } />
    </MuiThemeProvider>
  )
}
