import React from 'react'
import MuiThemeProvider from '../../styles/WimoThemeProvider'
import TextField from 'material-ui/TextField'

export default function Text({
  floatingLabelFixed,
  fullWidth,
  hintText,
  multiline,
  id,
  onChange,
  onEnterKeyDown,
  rows,
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
          hintText={ hintText }
          multiLine={ multiline }
          id={ id }
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
