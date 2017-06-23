import React from 'react';
import { connect } from 'react-redux';
import { fetchGeneralSummary } from '../actions';
import Loader from './Loader';
import { Table, PageHeader } from 'react-bootstrap';

class GeneralSummary extends React.Component {
  componentDidMount() {
    this.props.fetchGeneralSummary();
  }

  mapDataToRows() {
    if (!this.props.content) {
      return null;
    }

    return Object.values(this.props.content).map((item, index) => (
      <tr key={index}>
        <td>{item.mes}</td>
        <td>{item.ano}</td>
        <td>{item.embarcacoes_distintas}</td>
        <td>{item.qtd_viagens}</td>
        <td>{item.total_peso}</td>
      </tr>
    ));
  }

  render() {
    return (
      <div>
        <PageHeader>Relatório de atividade geral</PageHeader>
        <Loader fetching={this.props.fetching}>
          <Table bordered>
            <thead>
              <tr>
                <th>Mês</th>
                <th>Ano</th>
                <th>Embarcações distintas</th>
                <th>Quantidade de viagens</th>
                <th>Peso total (kg)</th>
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

export default connect(stateMapper, {fetchGeneralSummary})(GeneralSummary);
