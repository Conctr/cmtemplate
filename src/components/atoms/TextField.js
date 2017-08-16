import React from 'react'
import WimoThemeProvider from '../../styles/WimoThemeProvider'
import TextField from 'material-ui/TextField'

export default function Text(props) {

  let handleKeyDown = (event) => {
    switch (event.key) {
      case 'Enter':
        props.onEnterKeyDown()
        break
      default: break
    }
  }

  return (
    <WimoThemeProvider>
      <TextField
        { ...props }
        onKeyDown={ handleKeyDown }
      />
    </WimoThemeProvider> 
  )
}
