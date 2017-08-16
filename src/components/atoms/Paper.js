import React from 'react'
import WimoThemeProvider from '../../styles/WimoThemeProvider'
import Paper from 'material-ui/Paper'

export default function RaisedButton(props) {
  let mutableProps = {...props}
  let children = mutableProps.children
  delete mutableProps.children
  return (
    <WimoThemeProvider>
      <Paper {...mutableProps}>
        {children}
      </Paper>
    </WimoThemeProvider>
  )
}
