import React from 'react';
import { connect } from 'react-redux';
import { fetchShipSummary } from '../actions';
import Loader from './Loader';
import { Table, PageHeader } from 'react-bootstrap';

class ShipSummary extends React.Component {
  componentDidMount() {
    this.props.fetchShipSummary();
  }

  mapDataToRows() {
    if (!this.props.content) {
      return null;
    }

    return Object.values(this.props.content).map((item, index) => (
      <tr key={index}>
        <td>{item.nome}</td>
        <td>{item.mes}</td>
        <td>{item.ano}</td>
        <td>{item.total_capturado}</td>
      </tr>
    ));
  }

  render() {
    return (
      <div>
        <PageHeader>Relatório de atividade por embarcação</PageHeader>
        <Loader fetching={this.props.fetching}>
          <Table bordered>
            <thead>
              <tr>
                <th>Nome da embarcação</th>
                <th>Mês</th>
                <th>Ano</th>
                <th>Peso total capturado (kg)</th>
              </tr>
            </thead>
            <tbody>
              {this.mapDataToRows()}
            </tbody>
          </Table>
        </Loader>
      </div>
    );
  }
}

const stateMapper = (state) => ({
  ...state.summary
});

export default connect(stateMapper, {fetchShipSummary})(ShipSummary);
