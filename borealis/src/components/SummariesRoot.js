import React from 'react';
import { PageHeader, ListGroup } from 'react-bootstrap';
import ActionCard from './ActionCard';

class SummariesRoot extends React.Component {
  render() {
    return (
      <div>
        <PageHeader>Conferir relatórios</PageHeader>
        <ListGroup className="action-group">
          <ActionCard
            title="Relatório de atividade geral"
            image="/assets/viagem.png"
            link="/relatorio/geral"/>
          <ActionCard
            title="Relatório de atividade por embarcação"
            image="/assets/barco.png"
            link="/relatorio/embarcacao"/>
          <ActionCard
            title="Relatório de atividade por espécie"
            image="/assets/peixe.png"
            link="/relatorio/especie"/>
        </ListGroup>
      </div>
    );
  }
}

export default SummariesRoot;
