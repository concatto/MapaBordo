import React from 'react';
import { connect } from 'react-redux';
import { PageHeader } from 'react-bootstrap';
import { fetchShips } from '../../actions';
import EntityList from '../EntityList';
import LinkItem from '../LinkItem';

class QueryShip extends React.Component {
  mapShip(ship) {
    return (
      <LinkItem to={"/visualizar/embarcacao/" + ship.id} key={ship.id}>
        <h3>{ship.nome}</h3>
      </LinkItem>
    );
  }

  render() {
    return (
      <div>
        <PageHeader>Embarcações cadastradas</PageHeader>

        <EntityList
          className="ship-group"
          emptyMessage="Nenhuma embarcação cadastrada"
          fetchData={() => this.props.fetchShips()}
          fetching={this.props.fetching}
          data={this.props.content}
          contentMapper={(ship) => this.mapShip(ship)}
        />
      </div>
    );
  }
}

const stateMapper = (state) => ({
  ...state.ships
});

export default connect(stateMapper, {fetchShips})(QueryShip);
