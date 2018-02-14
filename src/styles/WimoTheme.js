import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { red800, red50, grey300, grey400, grey600 } from 'material-ui/styles/colors'

export const wimoTheme = getMuiTheme({
  chip: {
    backgroundColor: red50
  },
  circularProgress: {
    color: red800
  },
  flatButton: {
    primaryTextColor: grey600
  },
  palette: {
    textColor: grey600
  },
  tabs: {
    backgroundColor: red800
  },
  textField: {
    focusColor: red800
  },
  toolbar: {
    backgroundColor: grey300
  },
  raisedButton: {
    primaryColor: grey400
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
