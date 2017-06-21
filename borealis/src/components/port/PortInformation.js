import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPorts } from '../../actions';
import Loader from '../Loader';
import { PageHeader, Panel, Button } from 'react-bootstrap';

class PortInformation extends React.Component {
  componentDidMount() {
    this.props.fetchPorts(this.props.match.params.id);
  }

  getContent() {
    const { port } = this.props;
    
    if (port) {
      return (
        <div>
          <PageHeader>{port.nome}</PageHeader>
          <p>Tipo de administração: {port.adm === 1 ? "Pública" : "Privada"}</p>
          <p>Ano de fundação: {port.ano_fundacao}</p>
          <Button bsStyle="danger">Excluir porto</Button>
        </div>
      )
    } else {
      return (
        <Panel>
          <h4>Este porto não existe.</h4>
        </Panel>
      )
    }
  }

  render() {
    return (
      <div className="entity-information">
        <Loader fetching={this.props.fetching}>
          {this.getContent()}
        </Loader>
      </div>
    )
  }
}

const stateMapper = (state, ownProps) => ({
  port: state.ports.content ? state.ports.content[ownProps.match.params.id] : undefined,
  fetching: state.ports.fetching,
});

export default withRouter(connect(stateMapper, {fetchPorts})(PortInformation));
