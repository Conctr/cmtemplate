import React from 'react'
import WimoThemeProvider from '../../styles/WimoThemeProvider'
import TextField from 'material-ui/TextField'

export default function Text(props) {

  let mutableProps = {...props}
  let handleKey = mutableProps.onEnterKeyDown
  delete mutableProps.onEnterKeyDown

  let handleKeyDown = (event) => {
    switch (event.key) {
      case 'Enter':
        handleKey()
        break
      default: break
    }
  }

  return (
    <WimoThemeProvider>
      <TextField
        { ...mutableProps } 
        onKeyDown={ handleKeyDown }
      />
    </WimoThemeProvider> 
  )
}
