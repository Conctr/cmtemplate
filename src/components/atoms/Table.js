import React from 'react'
import WimoThemeProvider from '../../styles/WimoThemeProvider'
import Table from 'material-ui/Table'

export default function CustomTable(props) {
  let mutableProps = {...props}
  let children = mutableProps.children
  delete mutableProps.children
  return (
    <WimoThemeProvider>
      <Table {...mutableProps}>
        {children}
      </Table>
    </WimoThemeProvider>
  )
}
