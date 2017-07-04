import React from 'react';
import { connect } from 'react-redux';
import { PageHeader } from 'react-bootstrap';
import { fetchFishes } from '../../actions';
import EntityList from '../EntityList';
import LinkItem from '../LinkItem';

class QueryFish extends React.Component {
  mapFish(fish) {
    return (
      <LinkItem to={"/visualizar/especie/" + fish.id} key={fish.id}>
        <h3>{fish.nome}</h3>
      </LinkItem>
    );
  }

  render() {
    return (
      <div>
        <PageHeader>Peixes cadastrados</PageHeader>

        <EntityList
          className="fish-group"
          emptyMessage="Nenhuma espécie cadastrada"
          fetchData={() => this.props.fetchFishes()}
          fetching={this.props.fetching}
          failed={this.props.failed}
          data={this.props.content}
          contentMapper={(fish) => this.mapFish(fish)}
        />
      </div>
    );
  }
}

const stateMapper = (state) => ({
  ...state.fishes
});

export default connect(stateMapper, {fetchFishes})(QueryFish);
