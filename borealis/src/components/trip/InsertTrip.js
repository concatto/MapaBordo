import React from 'react';
import { connect } from 'react-redux';
import { fetchShips, fetchPorts, fetchFishes, postTrip } from '../../actions';
import { Button, PageHeader, FormGroup, ControlLabel, FormControl, Row, Col, Panel, ButtonToolbar, Glyphicon } from 'react-bootstrap';
import Input from '../Input';
import { reduxForm, Field, FieldArray } from 'redux-form';

const mapEntityToOptions = (entity, id = "id", name = "nome") => {
  if (!entity) {
    return null;
  }

  const options = Object.values(entity).map((item) => (
    <option key={item[id]} value={item[id]}>{item[name]}</option>
  ));

  return [<option key={0}/>].concat(options);
}

class Captures extends React.Component {
  render() {
    const { fields, fishes } = this.props;
    return (
      <div>
        <h3>Capturas</h3>

        {fields.map((item, index) => (
          <Row className="capture-row" key={index}>
            <Col xs={6}>
              <FormGroup>
                <ControlLabel>Espécie</ControlLabel>
                <Field name={item + ".fish"} component="select" className="form-control" required>
                  {mapEntityToOptions(fishes.content)}
                </Field>
              </FormGroup>
            </Col>

            <Field name={item + ".weight"} component={Input} label="Peso" type="number" real width={2}/>

            <Col xs={2}>
              <FormGroup>
                <Button onClick={() => fields.remove(index)} bsStyle="danger">
                  <Glyphicon glyph="remove"/>
                </Button>
              </FormGroup>
            </Col>
          </Row>
        ))}

        <Button onClick={() => fields.push({})} bsStyle="success">
          <Glyphicon glyph="plus"/>
        </Button>
      </div>
    );
  }
}

const CapturesContainer = connect(state => ({fishes: state.fishes}))(Captures);

class Efforts extends React.Component {
  render() {
    const { fields } = this.props;

    return (
      <div>
        <h3>Lances</h3>
        {fields.map((item, index) => (
          <Panel header={"Lance #" + (index + 1)} key={index}>
            <Row>
              <Field name={item + ".date"} component={Input} type="date" label="Data" width={4}/>
              <Field name={item + ".startTime"} component={Input} label="Hora de início (HH:MM)" width={4}/>
              <Field name={item + ".endTime"} component={Input} label="Hora de término (HH:MM)" width={4}/>
            </Row>

            <Row>
              <Field name={item + ".netLength"} component={Input} type="number" real label="Comprimento da rede (m)" width={6}/>
              <Field name={item + ".gridSize"} component={Input} type="number" real label="Tamanho da malha (cm)" width={6}/>
            </Row>

            <Row>
              <Field name={item + ".netHeight"} component={Input} type="number" real label="Altura da rede (m)" width={6}/>
              <Field name={item + ".depth"} component={Input} type="number" real label="Profundidade (m)" width={6}/>
            </Row>

            <Row>
              <Field name={item + ".lat"} component={Input} type="number" real label="Latitude inicial" width={6}/>
              <Field name={item + ".lng"} component={Input} type="number" real label="Longitude inicial" width={6}/>
            </Row>

            <FieldArray name={item + ".captures"} component={CapturesContainer}/>

            <Button bsStyle="danger" className="pull-right" onClick={() => fields.remove(index)}>
              Remover lance
            </Button>
          </Panel>
        ))}

        <ButtonToolbar>
          <Button onClick={() => fields.push({})}>Novo lance</Button>
          <Button type="submit" bsStyle="success">Cadastrar</Button>
        </ButtonToolbar>
      </div>
    );
  }
}

const TripForm = ({handleSubmit, ships, ports}) => (
  <form onSubmit={handleSubmit}>
    <Row>
      <Col xs={8}>
        <FormGroup>
          <ControlLabel>Embarcação</ControlLabel>
          <Field name="ship" component="select" className="form-control" required>
            {mapEntityToOptions(ships.content)}
          </Field>
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col xs={4}>
        <FormGroup>
          <ControlLabel>Porto de saída</ControlLabel>
          <Field name="sourcePort" component="select" className="form-control" required>
            {mapEntityToOptions(ports.content)}
          </Field>
        </FormGroup>
      </Col>

      <Field name="tripStart" component={Input} type="date" width={4} label="Data de saída"/>
    </Row>

    <Row>
      <Col xs={4}>
        <FormGroup>
          <ControlLabel>Porto de chegada</ControlLabel>
          <Field name="destPort" component="select" className="form-control" required>
            {mapEntityToOptions(ports.content)}
          </Field>
        </FormGroup>
      </Col>

      <Field name="tripEnd" component={Input} type="date" width={4} label="Data de chegada"/>
    </Row>
    <FieldArray name="efforts" component={Efforts}/>
  </form>
);

const stateMapper = (state) => ({
  ports: state.ports,
  ships: state.ships,
});

const TripFormContainer = reduxForm({
  form: "trip"
})(connect(stateMapper)(TripForm));

class InsertTrip extends React.Component {
  componentDidMount() {
    this.props.fetchShips();
    this.props.fetchPorts();
    this.props.fetchFishes();
  }

  handleSubmit(data) {
    console.log(data);
    this.props.postTrip(data);
  }

  render() {
    return (
      <div>
        <PageHeader>Nova viagem</PageHeader>
        <TripFormContainer onSubmit={(d) => this.handleSubmit(d)}/>
      </div>
    );
  }
}

export default connect(undefined, {
  fetchPorts, fetchShips, fetchFishes, postTrip
})(InsertTrip);
