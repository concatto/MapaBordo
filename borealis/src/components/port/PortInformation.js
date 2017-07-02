import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPorts, deletePort, openModal } from '../../actions';
import ConfirmationModal from '../ConfirmationModal';
import Loader from '../Loader';
import { PageHeader, Panel, Button } from 'react-bootstrap';

class PortInformation extends React.Component {
  componentDidMount() {
    this.props.fetchPorts(this.props.match.params.id);
  }

  getContent() {
    const { port, deletePort, openModal } = this.props;

    if (port) {
      return (
        <div>
          <PageHeader>{port.nome}</PageHeader>
          <p>Tipo de administração: {port.adm === 1 ? "Pública" : "Privada"}</p>
          <p>Ano de fundação: {port.ano_fundacao}</p>

          <Button bsStyle="danger" onClick={() => openModal("port-modal")}>
            Excluir porto
          </Button>

          <ConfirmationModal
            name="port-modal"
            message="O porto será permanentemente removido. Certifique-se que nenhuma
              viagem está relacionada à este porto. Deseja prosseguir?"
            onAccept={() => deletePort(port.id)}
          />
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

export default withRouter(connect(stateMapper, {fetchPorts, deletePort, openModal})(PortInformation));
