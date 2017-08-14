import React, { Component } from 'react'
import Formsy from 'formsy-react';

  class FormsyForm extends Component {
    constructor(props) {
        super(props)
      this.state = {
        canSubmit: false
      }
    }
    enableButton = () => {
      this.setState({
        canSubmit: true
      });
    }
    disableButton = () => {
      this.setState({
        canSubmit: false
      });
    }
    // submit(model) {
    //   someDep.saveEmail(model.email);
    // },
    render() {
      return (
        <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
          <MyOwnInput name="email" validations="isEmail" validationError="This is not a valid email" required/>
          <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
        </Formsy.Form>
      );
    }
  };

    class MyOwnInput extends Component {

        // Add the Formsy Mixin
        mixins: [Formsy.Mixin]
        constructor(props){
            super(props);
            this.bind(Formsy.Mixin)
        }

        // setValue() will set the value of the component, which in
        // turn will validate it and the rest of the form
        changeValue(event) {
        this.setValue(event.currentTarget.value);
        }

        render() {
            // Set a specific className based on the validation
            // state of this component. showRequired() is true
            // when the value is empty and the required prop is
            // passed to the input. showError() is true when the
            // value typed is invalid
            const className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;

            // An error message is returned ONLY if the component is invalid
            // or the server has returned an error message
            const errorMessage = this.getErrorMessage();

            return (
                <div className={className}>
                <input type="text" onChange={this.changeValue} value={this.getValue()}/>
                <span>{errorMessage}</span>
                </div>
            );
        }
    };


    export default FormsyForm;