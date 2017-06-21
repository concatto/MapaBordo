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
            link="/relatorios/geral"/>
          <ActionCard
            title="Relatório de atividade por embarcação"
            image="/assets/barco.png"
            link="/relatorios/embarcacao"/>
          <ActionCard
            title="Relatório de atividade por espécie"
            image="/assets/peixe.png"
            link="/relatorios/especie"/>
        </ListGroup>
      </div>
    );
  }
}

export default SummariesRoot;
