import React from 'react'
import WimoThemeProvider from '../../styles/WimoThemeProvider'
import Menu from 'material-ui/Menu'

export default function SimpleMenu (props){
  let mutableProps = { ...props }
  let children = mutableProps.children
  delete mutableProps.children
  return(
    <WimoThemeProvider>
      <Menu { ...mutableProps }>
        {children}
      </Menu>
    </WimoThemeProvider>
  )
}
