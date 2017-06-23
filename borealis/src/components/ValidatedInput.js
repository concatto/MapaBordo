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
    if (this.props.onChange) {
      this.props.onChange(e);
    }

    if (this.props.numeric) {
      const number = e.target.value.replace(",", ".");
      if (isNaN(number)) {
        this.setState({message: "O valor deve ser numérico."});
      } else {
        this.setState({message: ""});
      }
    }
  }

  render() {
    const isValid = this.state.message.length === 0;

    const { onChange, numeric, ...others } = this.props;

    return (
      <FormGroup validationState={isValid ? null : "error"}>
        <FormControl type="text"
          onChange={(e) => this.handleChange(e)}
          inputRef={(r) => this.input = r}
          {...others}
        />
        <FormControl.Feedback/>
        {!isValid &&
          <HelpBlock>{this.state.message}</HelpBlock>
        }
      </FormGroup>
    );
  }
}

export default ValidatedInput;
