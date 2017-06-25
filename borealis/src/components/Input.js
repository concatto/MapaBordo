import React from 'react';
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';

const Input = ({input, width = 8, label, type = "text", real, optional}) => {
  const step = real ? "0.01" : undefined;
  const required = optional ? undefined : "required";

  return (
    <Col xs={width}>
      <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        <FormControl required={required} type={type} step={step} {...input}/>
      </FormGroup>
    </Col>
  );
}

export default Input;
