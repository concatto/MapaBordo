import React from 'react';
import { connect } from 'react-redux';
import { PageHeader } from 'react-bootstrap';
import { fetchPorts } from '../../actions';
import EntityList from '../EntityList';
import LinkItem from '../LinkItem';

class QueryPort extends React.Component {
  mapPort(port) {
    return (
      <LinkItem to={"/visualizar/porto/" + port.id} key={port.id}>
        <h3>{port.nome}</h3>
      </LinkItem>
    );
  }

  render() {
    return (
      <div>
        <PageHeader>Portos cadastrados</PageHeader>

        <EntityList
          className="port-group"
          emptyMessage="Nenhum porto cadastrado"
          fetchData={() => this.props.fetchPorts()}
          fetching={this.props.fetching}
          data={this.props.content}
          contentMapper={(port) => this.mapPort(port)}
        />
      </div>
    );
  }
}

const stateMapper = (state) => ({
  ...state.ports
});

export default connect(stateMapper, {fetchPorts})(QueryPort);
