import React from 'react';
import { connect } from 'react-redux';
import { fetchShipSummary } from '../actions';
import Loader from './Loader';
import { PageHeader } from 'react-bootstrap';
import { Table, Thead, Th, Tr, Td } from 'reactable';
import FailureAlert from './FailureAlert';

class ShipSummary extends React.Component {
  componentDidMount() {
    this.props.fetchShipSummary();
  }

  mapDataToRows() {
    if (!this.props.content) {
      return null;
    }

    return Object.values(this.props.content).map((item, index) => (
      <Tr key={index}>
        <Td column="name">{item.nome}</Td>
        <Td column="month">{item.mes}</Td>
        <Td column="year">{item.ano}</Td>
        <Td column="count">{item.viagens_realizadas}</Td>
        <Td column="weight">{item.total_capturado}</Td>
      </Tr>
    ));
  }

  getContent() {
    if (this.props.failed) {
      return <FailureAlert/>;
    }

    return (
      <Table sortable className="table table-hover table-bordered">
        <Thead>
          <Th column="name">Nome da embarcação</Th>
          <Th column="month">Mês</Th>
          <Th column="year">Ano</Th>
          <Th column="count">Viagens realizadas</Th>
          <Th column="weight">Peso total capturado (kg)</Th>
        </Thead>
        {this.mapDataToRows()}
      </Table>
    );
  }

  render() {
    return (
      <div>
        <PageHeader>Relatório de atividade por embarcação</PageHeader>
        <Loader fetching={this.props.fetching}>
          {this.getContent()}
        </Loader>
      </div>
    );
  }
}

const stateMapper = (state) => ({
  ...state.summary
});

export default connect(stateMapper, {fetchShipSummary})(ShipSummary);
