import React from 'react'
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default function Text({
  floatingLabelFixed,
  multiline,
  rows,
  text
}) {
  return (
    <div>
      <MuiThemeProvider>
        <TextField
          floatingLabelFixed={ floatingLabelFixed }
          hintText={ text }
          multiLine={ multiline }
          rows={ rows }
        />
      </MuiThemeProvider> 
    </div>
  )
}
