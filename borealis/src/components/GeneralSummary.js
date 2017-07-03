import React from 'react';
import { connect } from 'react-redux';
import { fetchGeneralSummary } from '../actions';
import Loader from './Loader';
import { PageHeader } from 'react-bootstrap';
import { Table, Tr, Td, Thead, Th } from 'reactable';

class GeneralSummary extends React.Component {
  componentDidMount() {
    this.props.fetchGeneralSummary();
  }

  mapDataToRows() {
    if (!this.props.content) {
      return null;
    }

    return Object.values(this.props.content).map((item, index) => (
      <Tr key={index}>
        <Td column="month">{item.mes}</Td>
        <Td column="year">{item.ano}</Td>
        <Td column="ships">{item.embarcacoes_distintas}</Td>
        <Td column="trips">{item.qtd_viagens}</Td>
        <Td column="weight">{item.total_peso}</Td>
      </Tr>
    ));
  }

  render() {
    return (
      <div>
        <PageHeader>Relatório de atividade geral</PageHeader>
        <Loader fetching={this.props.fetching}>
          <Table sortable={true} className="table table-bordered table-hover">
            <Thead>
              <Th column="month">Mês</Th>
              <Th column="year">Ano</Th>
              <Th column="ships">Embarcações distintas</Th>
              <Th column="trips">Quantidade de viagens</Th>
              <Th column="weight">Peso total (kg)</Th>
            </Thead>
            {this.mapDataToRows()}
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
