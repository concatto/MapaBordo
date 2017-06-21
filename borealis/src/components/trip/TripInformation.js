import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchTrips } from '../../actions';
import Loader from '../Loader';
import { PageHeader, Panel, Button } from 'react-bootstrap';
import { formatDateLong, formatDate, convertLatitude, convertLongitude } from '../../utils';

class TripInformation extends React.Component {
  componentDidMount() {
    this.props.fetchTrips(this.props.match.params.id);
  }

  createLink(entityName, entity, pId = "id", pName = "nome") {
    return <Link to={"/visualizar/" + entityName + "/" + entity[pId]}>{entity[pName]}</Link>;
  }

  mapCapturesToComponents(data) {
    const values = Object.values(data);

    if (values.length > 0) {
      return (
        <div>
          <h4>Capturas:</h4>
          <ul>
            {values.map((cap, index) => (
              <li key={index}>
                {+cap.peso.toFixed(2)} kg de {this.createLink("especie", this.props.fishes[cap.especie_id])}
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <p className="text-danger">O lance não contém nenhuma captura.</p>
    }
  }

  mapEffortsToComponents(data) {
    const values = Object.values(data);

    if (values.length > 0) {
      let index = 0;
      return values.map((item) => {
        index++;
        return (
          <div key={item.id}>
            <h3>Lance #{index}</h3>
            <p>Hora de início: {formatDate(item.hora_inicio)}</p>
            <p>Hora de término: {formatDate(item.hora_fim)}</p>
            <p>Comprimento da rede: {+item.comprimento_rede.toFixed(2)} m</p>
            <p>Altura da rede: {+item.altura_rede.toFixed(2)} m</p>
            <p>Tamanho da malha: {+item.tamanho_malha.toFixed(2)} cm</p>
            <p>Profundidade: {+item.profundidade.toFixed(2)} m</p>
            <p>Latitude inicial: {convertLatitude(item.latitude_inicial)}</p>
            <p>Longitude inicial: {convertLongitude(item.longitude_inicial)}</p>
            {this.mapCapturesToComponents(item.capturas)}
          </div>
        );
      });
    } else {
      return <p className="text-danger">A viagem não possui nenhum lance.</p>;
    }
  }

  getContent() {
    const { trip, ports, ships } = this.props;

    if (trip) {
      const saida = ports[trip.porto_saida_id];
      const chegada = ports[trip.porto_chegada_id];
      const embarcacao = ships[trip.embarcacao_id];

      return (
        <div>
          <PageHeader>{saida.nome} &rarr; {chegada.nome}</PageHeader>
          <p>Embarcação: {this.createLink("embarcacao", embarcacao)}</p>
          <p>Saída: {this.createLink("porto", saida)}. Data: {formatDateLong(trip.data_saida)}</p>
          <p>Chegada: {this.createLink("porto", chegada)}. Data: {formatDateLong(trip.data_chegada)}</p>
          {this.mapEffortsToComponents(trip.lances)}
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
  fishes: state.fishes.content,
  ports: state.ports.content,
  ships: state.ships.content,
});

export default withRouter(connect(stateMapper, {fetchTrips})(TripInformation));
