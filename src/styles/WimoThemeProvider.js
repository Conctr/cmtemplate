import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { wimoTheme } from './WimoTheme';

export default function WimoThemeProvider (props){
  
    return (
      <MuiThemeProvider muiTheme={ wimoTheme }>
        { props.children }
      </MuiThemeProvider>
    )
}
