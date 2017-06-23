import React from 'react';
import { PageHeader } from 'react-bootstrap';
import ValidatedInput from '../ValidatedInput';

class InsertShip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      tamanho: "",
    };
  }

  handleTextChange(e, property) {
    this.setState({
      [property]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <PageHeader>Nova embarcação</PageHeader>
        <ValidatedInput placeholder="Nome"
          value={this.state.nome}
          onChange={(e) => this.handleTextChange(e, "nome")}
        />

        <ValidatedInput placeholder="Tamanho" numeric
          value={this.state.tamanho}
          onChange={(e) => this.handleTextChange(e, "tamanho")}
        />
      </div>
    );
  }
}

export default InsertShip;
