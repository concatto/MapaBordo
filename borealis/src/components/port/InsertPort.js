import React from 'react';
import { PageHeader, FormGroup, ControlLabel, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { postPort } from '../../actions';
import Input from '../Input';

class PortForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Row>
          <Field width={6} name="name" component={Input} type="text" label="Nome do porto"/>
          <Field width={2} name="year" component={Input} type="number" label="Ano de fundação"/>
        </Row>

        <Row>
          <Col xs={4}>
            <FormGroup>
              <ControlLabel>Tipo de administração</ControlLabel>
              <br/>
              <label className="radio-inline">
                <Field name="adm" component="input" type="radio" value="public"/>
                Pública
              </label>

              <label className="radio-inline">
                <Field name="adm" component="input" type="radio" value="private"/>
                Privada
              </label>
            </FormGroup>
          </Col>

        </Row>

        <Button type="submit" bsStyle="success" disabled={this.props.busy}>Cadastrar</Button>
      </form>
    );
  }
}

const PortFormContainer = reduxForm({
  form: "port",
  initialValues: {adm: "public"}
})(PortForm);

class InsertPort extends React.Component {
  handleSubmit(data) {
    this.props.postPort(data);
  }

  render() {
    return (
      <div>
        <PageHeader>Novo porto</PageHeader>
        <PortFormContainer busy={this.props.busy} onSubmit={(d) => this.handleSubmit(d)}/>
      </div>
    );
  }
}

export default connect((state) => ({
  busy: state.post.busy
}), {postPort})(InsertPort);
