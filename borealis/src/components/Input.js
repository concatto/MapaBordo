import React from 'react';
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';

const Input = ({input, width = 12, label, type = "text", real}) => {
  const step = real ? "0.01" : undefined;

  return (
    <Col xs={width}>
      <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        <FormControl required type={type} step={step} {...input}/>
      </FormGroup>
    </Col>
  );
}

export default Input;
