import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, ControlLabel, FormControl, Row, Col, Glyphicon } from 'react-bootstrap';

class Capture extends React.Component {
  mapFishesToOptions() {
    if (!this.props.fishes.content) {
      return null;
    }
    return Object.values(this.props.fishes.content).map(fish => (
      <option key={fish.id} value={fish.id}>{fish.nome}</option>
    ));
  }

  render() {
    return (
      <Row className="capture-row">
        <Col xs={5}>
          <FormGroup>
            <ControlLabel>Espécie</ControlLabel>
            <FormControl componentClass="select">
              {this.mapFishesToOptions()}
            </FormControl>
          </FormGroup>
        </Col>
        <Col xs={2}>
          <FormGroup>
            <ControlLabel>Peso</ControlLabel>
            <FormControl type="text"/>
          </FormGroup>
        </Col>
        <Col xs={1}>
          <FormGroup>
            <Button bsStyle="danger" bsSize="small">
              <Glyphicon glyph="remove"/>
            </Button>
          </FormGroup>
        </Col>
      </Row>
    );
  }
}

const stateMapper = (state, ownProps) => ({
  fishes: state.fishes,
  ...ownProps
});

export default connect(stateMapper)(Capture);
