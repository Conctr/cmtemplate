import React from 'react'
import WimoThemeProvider from '../../styles/WimoThemeProvider'
import MenuItem from 'material-ui/MenuItem' 

export default function MenuItem (props){
  console.log('props',props)
  return(
      <MenuItem
        primaryText='hai'
      />
  )
}
