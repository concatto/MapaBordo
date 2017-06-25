import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, ControlLabel, FormControl, Row, Col, Glyphicon } from 'react-bootstrap';
import ValidatedInput from '../ValidatedInput';
import Capture from './Capture';

class Effort extends React.Component {
  mapCapturesToComponents() {
    const { efforts, id } = this.props;

    return Object.values(efforts[id].captures).map((item, index) => (
      <Capture key={index} id={item.id}/>
    ));
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={4}>
            <FormGroup>
              <ControlLabel>Data</ControlLabel>
              <FormControl type="date"/>
            </FormGroup>
          </Col>
          <Col xs={4}>
            <FormGroup>
              <ControlLabel>Hora de início</ControlLabel>
              <ValidatedInput numeric/>
            </FormGroup>
          </Col>
          <Col xs={4}>
            <FormGroup>
              <ControlLabel>Hora de término</ControlLabel>
              <ValidatedInput numeric/>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <FormGroup>
              <ControlLabel>Comprimento da rede</ControlLabel>
              <ValidatedInput numeric/>
            </FormGroup>
          </Col>
          <Col xs={6}>
            <FormGroup>
              <ControlLabel>Tamanho da malha</ControlLabel>
              <ValidatedInput numeric/>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <FormGroup>
              <ControlLabel>Altura da rede</ControlLabel>
              <ValidatedInput numeric/>
            </FormGroup>
          </Col>
          <Col xs={6}>
            <FormGroup>
              <ControlLabel>Profundidade</ControlLabel>
              <ValidatedInput numeric/>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <FormGroup>
              <ControlLabel>Latitude</ControlLabel>
              <ValidatedInput numeric/>
            </FormGroup>
          </Col>
          <Col xs={6}>
            <FormGroup>
              <ControlLabel>Longitude</ControlLabel>
              <ValidatedInput numeric/>
            </FormGroup>
          </Col>
        </Row>

        <h3>Capturas</h3>
        {this.mapCapturesToComponents()}

        <Button bsStyle="success">
          <Glyphicon glyph="plus"/>
        </Button>

        <Button className="pull-right" bsStyle="danger">
          Remover lance
        </Button>
      </div>
    );
  }
}

const stateMapper = (state) => ({
  efforts: state.efforts,
});

export default connect(stateMapper)(Effort);
