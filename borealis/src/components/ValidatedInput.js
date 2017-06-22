import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, FormControl, HelpBlock } from 'react-bootstrap';

class ValidatedInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    }
  }

  handleChange(e) {
    if (this.props.numeric) {
      const number = e.target.value.replace(",", ".");
      if (isNaN(number)) {
        this.setState({message: "O valor deve ser numérico."});
      } else {
        this.setState({message: ""});
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.required && this.props.shouldTestRequired) {
      if (this.input.value.trim().length === 0) {
        this.displayMessage("Este campo é obrigatório.");
      }
    }
  }

  displayMessage(message) {
    if (this.state.message !== message) {
      this.setState({message});
    }
  }

  render() {
    const isValid = this.state.message.length === 0;

    return (
      <FormGroup validationState={isValid ? null : "error"}>
        <FormControl type="text" onBlur={() => this.props.toggle()} onChange={(e) => this.handleChange(e)} inputRef={(r) => this.input = r}/>
        <FormControl.Feedback/>
        {!isValid &&
          <HelpBlock>{this.state.message}</HelpBlock>
        }
      </FormGroup>
    );
  }
}

const stateMapper = (state) => ({
  ...state.form
});

const dispatchMapper = (dispatch) => ({
  toggle: () => dispatch({type: "TOGGLE_TEST_REQUIRED", payload: true})
});

export default connect(stateMapper, dispatchMapper)(ValidatedInput);
