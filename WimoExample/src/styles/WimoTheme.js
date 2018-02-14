import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { red800, red50 } from 'material-ui/styles/colors'

export const wimoTheme = getMuiTheme({
  chip: {
    backgroundColor: red50
  },
  circularProgress:{
     color: red800
  },
  flatButton: {
    primaryTextColor: red800
  },
  palette: {
    textColor: red800
  },
  tabs: {
    backgroundColor: red800
  },
  textField: {
    focusColor: red800
  },
  toolbar: {
    backgroundColor: red800
  },
  raisedButton: {
    primaryColor: red800
  },
  slider: {
    selectionColor: red800,
    rippleColor: red800
  },
  toggle: {
    thumbOnColor: red800,
    thumbRequiredColor: red800,
    trackOnColor: 'rgba(200, 45, 45, 0.5)'
  }
})
