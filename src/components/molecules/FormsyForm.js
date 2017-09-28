import React, { Component } from 'react'
import Formsy from 'formsy-react'
import TextField from '../atoms/TextField'

class FormsyForm extends Component {
  state = {
    canSubmit: false
  }

  enableButton() {
    this.setState({
      canSubmit: true
    })
  }

  disableButton() {
    this.setState({
      canSubmit: false
    })
  }

  submitForm(data) {
    alert(JSON.stringify(data, null, 4));
  }

  notifyFormError(data) {
    // // console.error('Form error:', data);
  } 

  render() {
    return (
      <div>
        <Formsy.Form
          onInvalidSubmit={ this.notifyFormError }
          onValidSubmit={ this.submitForm }
          onValid={ this.enableButton }
          onInvalid={ this.disableButton }
        >
          <input
            name="email"
            validations="isEmail"
            validationError="This is not a valid email"
            required
          />
          <button
            type="submit"
            disabled={ !this.state.canSubmit }
          >
            Submit
          </button>
        </Formsy.Form>
      </div>
    );
  }
}

 export default FormsyForm
