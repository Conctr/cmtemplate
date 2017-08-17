import React from 'react'
import WimoThemeProvider from '../../styles/WimoThemeProvider'
import CircularProgress from 'material-ui/CircularProgress'

export default function Progress(props) {
  return (
    <WimoThemeProvider>
      <CircularProgress
        { ...props }
      />
    </WimoThemeProvider> 
  )
}
