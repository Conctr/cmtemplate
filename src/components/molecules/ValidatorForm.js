import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Paper from 'material-ui/Paper'
import Formsy from 'formsy-react'
import { FormsyText } from 'formsy-material-ui/lib'

export default class ValidatorForm extends Component {
  constructor(){
    super()
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
  
    let paperStyle = {
      width: 300,
      margin: 'auto',
      padding: 20,
    }

    return (
      <MuiThemeProvider muiTheme={ getMuiTheme() }>
        <Paper style={ this.paperStyle }>
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
          </Formsy.Form>
        </Paper>
      </MuiThemeProvider>
    )
  }
}
