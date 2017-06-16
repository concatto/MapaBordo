import React from 'react';
import { connect } from 'react-redux';
import { PageHeader, ListGroupItem } from 'react-bootstrap';
import { fetchShips } from '../../actions';
import EntityList from '../EntityList';
import LinkItem from '../LinkItem';

class QueryShip extends React.Component {
  mapShips() {
    if (this.props.content) {
      return Object.values(this.props.content).map((ship) => (
        <LinkItem to={"/visualizar/embarcacao/" + ship.id} key={ship.id}>
          <h3>{ship.nome}</h3>
        </LinkItem>
      ));
    }

    return null;
  }

  render() {
    return (
      <div>
        <PageHeader>Embarcações cadastradas</PageHeader>

        <EntityList
          className="ship-group"
          emptyMessage="Nenhuma embarcação cadastrada"
          fetchData={() => this.props.fetchShips()}
          content={this.mapShips()}
          fetching={this.props.fetching}
        />
      </div>
    );
  }
}

const stateMapper = (state) => ({
  ...state.ships
});

export default connect(stateMapper, {fetchShips})(QueryShip);
