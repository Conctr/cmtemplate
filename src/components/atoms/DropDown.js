import React from 'react'
import WimoThemeProvider from '../../styles/WimoThemeProvider'
import DropDownMenu from 'material-ui/DropDownMenu';

export default function Checkbox(props) {
  let mutableProps = {...props}
  let children = mutableProps.children
  delete mutableProps.children
  return (
    <WimoThemeProvider>
      <DropDownMenu {...props}>
        {children}
      </DropDownMenu>
    </WimoThemeProvider>
  )
}
