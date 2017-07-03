import React from 'react';
import { PageHeader, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import Input from '../Input';
import { postShip } from '../../actions';

class ShipForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Row>
          <Field name="name" component={Input} label="Nome da embarcação"/>
        </Row>
        <Row>
          <Field name="size" component={Input} label="Tamanho da embarcação" real width={4}/>
        </Row>
        <Button bsStyle="success" type="submit" disabled={this.props.busy}>Cadastrar</Button>
      </form>
    );
  }
}

const ShipFormContainer = reduxForm({form: "ship"})(ShipForm);

class InsertShip extends React.Component {
  handleSubmit(data) {
    this.props.postShip(data);
  }

  render() {
    return (
      <div>
        <PageHeader>Nova embarcação</PageHeader>
        <ShipFormContainer busy={this.props.busy} onSubmit={(d) => this.handleSubmit(d)}/>
      </div>
    );
  }
}

export default connect((state) => ({
  busy: state.post.busy
}), {postShip})(InsertShip);
