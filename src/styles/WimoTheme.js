import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { red800 } from 'material-ui/styles/colors'

export const wimoTheme = getMuiTheme({
  palette: {
    textColor: red800
  },
  tabs: {
    backgroundColor: red800
  },
  textField: {
    focusColor: red800
  },
  raisedButton: {
    primaryColor: red800
  }
})
