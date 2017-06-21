import React from 'react';
import { connect } from 'react-redux';
import { PageHeader } from 'react-bootstrap';
import { fetchTrips } from '../../actions';
import EntityList from '../EntityList';
import LinkItem from '../LinkItem';
import { formatDateShort } from '../../utils';

class QueryTrip extends React.Component {
  mapTrip(trip) {
    const { ports } = this.props;
    const saida = ports[trip.porto_saida_id].nome
    const chegada = ports[trip.porto_chegada_id].nome;

    return (
      <LinkItem to={"/visualizar/viagem/" + trip.id} key={trip.id}>
        <h3>{saida} &rarr; {chegada}</h3>
        <h5>Saída: {formatDateShort(trip.data_saida)}</h5>
        <h5>Chegada: {formatDateShort(trip.data_chegada)}</h5>
      </LinkItem>
    );
  }

  render() {
    return (
      <div>
        <PageHeader>Viagens cadastradas</PageHeader>

        <EntityList
          className="trip-group"
          emptyMessage="Nenhuma viagem cadastrada"
          fetchData={() => this.props.fetchTrips()}
          fetching={this.props.trips.fetching}
          data={this.props.trips.content}
          contentMapper={(trip) => this.mapTrip(trip)}
        />
      </div>
    );
  }
}

const stateMapper = (state) => ({
  trips: state.trips,
  ports: state.ports.content,
});

export default connect(stateMapper, {fetchTrips})(QueryTrip);
