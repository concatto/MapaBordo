import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchTrips } from '../../actions';
import Loader from '../Loader';
import { PageHeader, Panel, Button } from 'react-bootstrap';

class TripInformation extends React.Component {
  componentDidMount() {
    this.props.fetchTrips(this.props.match.params.id);
  }

  getContent() {
    const { trip } = this.props;
    
    if (trip) {
      return (
        <div>
          <PageHeader>{trip.porto_saida} &rarr; {trip.porto_chegada}</PageHeader>
          
          <Button bsStyle="danger">Excluir viagem</Button>
        </div>
      )
    } else {
      return (
        <Panel>
          <h4>Esta viagem não existe.</h4>
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
  trip: state.trips.content ? state.trips.content[ownProps.match.params.id] : undefined,
  fetching: state.trips.fetching,
});

export default withRouter(connect(stateMapper, {fetchTrips})(TripInformation));
