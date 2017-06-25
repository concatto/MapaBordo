import React from 'react';
import { connect } from 'react-redux';
import { fetchShips, fetchPorts, fetchFishes } from '../../actions';
import { Button, PageHeader, FormGroup, ControlLabel, FormControl, Row, Col, Panel } from 'react-bootstrap';
import ValidatedInput from '../ValidatedInput';
import Effort from './Effort';

class InsertTrip extends React.Component {
  componentDidMount() {
    this.props.fetchShips();
    this.props.fetchPorts();
    this.props.fetchFishes();
  }

  mapShipsToOptions() {
    if (!this.props.ships.content) {
      return null;
    }

    return Object.values(this.props.ships.content).map((ship) => (
      <option key={ship.id} value={ship.id}>{ship.nome}</option>
    ));
  }

  mapPortsToOptions() {
    if (!this.props.ports.content) {
      return null;
    }

    return Object.values(this.props.ports.content).map((port) => (
      <option key={port.id} value={port.id}>{port.nome}</option>
    ));
  }

  mapEffortsToComponents() {
    return Object.values(this.props.efforts).map((effort, index) => (
      <Panel header={"Lance #" + (index + 1)} key={index}>
        <Effort id={effort.id}/>
      </Panel>
    ));
  }

  render() {
    return (
      <div>
        <PageHeader>Nova viagem</PageHeader>
        <form>
          <FormGroup>
            <ControlLabel>Embarcação</ControlLabel>
            <FormControl componentClass="select">
              {this.mapShipsToOptions()}
            </FormControl>
          </FormGroup>
          <Row>
            <Col xs={6}>
              <FormGroup>
                <ControlLabel>Porto de saída</ControlLabel>
                <FormControl componentClass="select">
                  {this.mapPortsToOptions()}
                </FormControl>
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup>
                <ControlLabel>Data de saída</ControlLabel>
                <FormControl type="date"/>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <FormGroup>
                <ControlLabel>Porto de chegada</ControlLabel>
                <FormControl componentClass="select">
                  {this.mapPortsToOptions()}
                </FormControl>
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup>
                <ControlLabel>Data de chegada</ControlLabel>
                <FormControl type="date"/>
              </FormGroup>
            </Col>
          </Row>
          {Object.keys(this.props.efforts).length > 0 &&
            <h3>Lances</h3>
          }

          {this.mapEffortsToComponents()}

          <Button>Novo lance</Button>
        </form>
      </div>
    )
  }
}

const stateMapper = (state) => ({
  ports: state.ports,
  ships: state.ships,
  efforts: state.efforts,
});

export default connect(stateMapper, {
  fetchPorts, fetchShips, fetchFishes
})(InsertTrip);
