import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import Formsy from 'formsy-react'
import { FormsyText } from 'formsy-material-ui/lib'
import RaisedButton from '../atoms/RaisedButton'

export default class ValidatorForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      canSubmit: false
    }
  }

  enableButton = () => {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton = () => {
    this.setState({
      canSubmit: false,
    });
  }

  submitForm = (data) => {
    alert(JSON.stringify(data, null, 4));
  }

  notifyFormError = (data) => {
    console.error('Form error:', data);
  }

  render() {

    return (
      <MuiThemeProvider muiTheme={ getMuiTheme() }>
        <Formsy.Form
          onValid={ this.enableButton }
          onInvalid={ this.disableButton }
          onValidSubmit={ this.submitForm }
          onInvalidSubmit={ this.notifyFormError }
        >
          <FormsyText
            name="name"
            validations="isWords"
            required
            hintText="Email address"
            floatingLabelText="Email address"
          /> 
          <br />
          <FormsyText
            name="password"
            validations="isWords"
            required
            hintText="Password"
            floatingLabelText="Password"
          /> 
          <RaisedButton
            fullWidth={ true }
            label='Sign in using email'
          /> 
        </Formsy.Form>
      </MuiThemeProvider>
    )
  }
}
