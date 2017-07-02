import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchShips, deleteShip, openModal } from '../../actions';
import ConfirmationModal from '../ConfirmationModal';
import Loader from '../Loader';
import { PageHeader, Panel, Button } from 'react-bootstrap';

class ShipInformation extends React.Component {
  componentDidMount() {
    this.props.fetchShips(this.props.match.params.id);
  }

  getContent() {
    const { ship, deleteShip, openModal } = this.props;

    if (ship) {
      return (
        <div>
          <PageHeader>Embarcação: {ship.nome}</PageHeader>
          <p>Tamanho da embarcação: {ship.tamanho.toFixed(2)} metros cúbicos</p>

          <Button bsStyle="danger" onClick={() => openModal("ship-modal")}>
            Excluir embarcação
          </Button>

          <ConfirmationModal
            name="ship-modal"
            message="A embarcação será permanentemente removida. Certifique-se que nenhuma viagem na
              base de dados tenha sido realizada com esta embarcação. Deseja prosseguir?"
            onAccept={() => deleteShip(ship.id)}
          />
        </div>
      )
    } else {
      return (
        <Panel>
          <h4>Esta embarcação não existe.</h4>
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
  ship: state.ships.content ? state.ships.content[ownProps.match.params.id] : undefined,
  fetching: state.ships.fetching,
});

export default withRouter(connect(stateMapper, {fetchShips, openModal, deleteShip})(ShipInformation));
