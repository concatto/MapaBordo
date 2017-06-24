import React from 'react';
import { connect } from 'react-redux';
import { fetchShips, fetchPorts } from '../../actions';
import { Button, PageHeader, FormGroup, ControlLabel, FormControl, Row, Col, Panel } from 'react-bootstrap';
import ValidatedInput from '../ValidatedInput';

class InsertTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      efforts: [],
    };
  }

  componentDidMount() {
    this.props.fetchShips();
    this.props.fetchPorts();
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

  createEffort() {
    const number = this.state.efforts.length;
    const panel = (
      <Panel header={"Lance #" + (number + 1)} key={number}>
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

        <Button className="pull-right" bsStyle="danger">
          Remover lance
        </Button>
      </Panel>
    );

    this.setState({
      efforts: this.state.efforts.concat([panel]),
    });
  }

  render() {
    console.log(this.state);

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
          {this.state.efforts.length > 0 &&
            <h3>Lances</h3>
          }
          {this.state.efforts}
          <Button onClick={() => this.createEffort()}>Novo lance</Button>
        </form>
      </div>
    )
  }
}

const stateMapper = (state) => ({
  ports: state.ports,
  ships: state.ships
});

export default connect(stateMapper, {fetchPorts, fetchShips})(InsertTrip);
