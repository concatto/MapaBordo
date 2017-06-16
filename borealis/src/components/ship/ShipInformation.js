import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchShips } from '../../actions';
import Loader from '../Loader';
import { PageHeader, Panel, Button } from 'react-bootstrap';

class ShipInformation extends React.Component {
  componentDidMount() {
    this.props.fetchShips(this.props.match.params.id);
  }

  getContent() {
    if (this.props.ship) {
      return (
        <div>
          <PageHeader>Embarcação: {this.props.ship.nome}</PageHeader>
          <p>Tamanho da embarcação: {this.props.ship.tamanho.toFixed(2)} metros cúbicos</p>
          <Button bsStyle="danger">Excluir embarcação</Button>
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

export default withRouter(connect(stateMapper, {fetchShips})(ShipInformation));
