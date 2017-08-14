import React, { Component } from 'react'
import { red800 } from 'material-ui/styles/colors'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const wimoTheme = getMuiTheme({
  palette: {
    textColor: red800
  },
  tabs: {
    backgroundColor: red800
  }
})

class WimoThemeProvider extends Component {
  
  render() {
    return (
      <MuiThemeProvider muiTheme={ wimoTheme }>
        { this.props.children }
      </MuiThemeProvider>
    )
  }
}

export default WimoThemeProvider
