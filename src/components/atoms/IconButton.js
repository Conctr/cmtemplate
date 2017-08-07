import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Button from 'material-ui/IconButton'

export default function IconButton ({
  children,
  className,
  href,
  iconClassName,
  onTouchTap

}) {
  return (
    <MuiThemeProvider>
      <Button
        children={ children }
        className={ className } 
        href={ href }
        iconClassName= { iconClassName }
        onTouchTap={ onTouchTap } />
    </MuiThemeProvider>
  )
}

