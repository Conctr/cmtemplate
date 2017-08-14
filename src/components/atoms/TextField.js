import React from 'react'
import MuiThemeProvider from '../../styles/WimoThemeProvider'
import TextField from 'material-ui/TextField'

export default function Text({
  floatingLabelFixed,
  fullWidth,
  multiline,
  onChange,
  onEnterKeyDown,
  rows,
  text,
  type,
  value
}) {

  let handleKeyDown = (event) => {
    switch (event.key) {
      case 'Enter':
        onEnterKeyDown()
        break
      default: break
    }
  }

  return (
    <div>
      <MuiThemeProvider>
        <TextField
          floatingLabelFixed={ floatingLabelFixed }
          fullWidth={ fullWidth }
          hintText={ text }
          multiLine={ multiline }
          onChange={ onChange }
          onKeyDown={ handleKeyDown }
          rows={ rows }
          type={ type }
          value={ value }
        />
      </MuiThemeProvider> 
    </div>
  )
}
