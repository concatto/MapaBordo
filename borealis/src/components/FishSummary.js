import React from 'react';
import { connect } from 'react-redux';
import { fetchFishSummary } from '../actions';
import Loader from './Loader';
import { PageHeader } from 'react-bootstrap';
import { Table, Thead, Th, Tr, Td } from 'reactable';

class FishSummary extends React.Component {
  componentDidMount() {
    this.props.fetchFishSummary();
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
        <Td column="weight">{item.total_capturado}</Td>
      </Tr>
    ));
  }

  render() {
    return (
      <div>
        <PageHeader>Relatório de atividade por espécie</PageHeader>
        <Loader fetching={this.props.fetching}>
          <Table sortable className="table table-hover table-bordered">
            <Thead>
              <Th column="name">Nome da espécie</Th>
              <Th column="month">Mês</Th>
              <Th column="year">Ano</Th>
              <Th column="weight">Peso total capturado (kg)</Th>
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

export default connect(stateMapper, {fetchFishSummary})(FishSummary);
