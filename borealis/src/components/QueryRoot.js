import React from 'react';
import { PageHeader, ListGroup } from 'react-bootstrap';
import ActionCard from './ActionCard';

class QueryRoot extends React.Component {
  render() {
    return (
      <div>
        <PageHeader>Visualizar informações</PageHeader>
        <ListGroup className="action-group">
          <ActionCard
            title="Visualizar viagens"
            image="/assets/viagem.png"
            link="/visualizar/viagem"/>
          <ActionCard
            title="Visualizar embarcações"
            image="/assets/barco.png"
            link="/visualizar/embarcacao"/>
          <ActionCard
            title="Visualizar espécies"
            image="/assets/peixe.png"
            link="/visualizar/especie"/>
          <ActionCard
            title="Visualizar portos"
            image="/assets/porto.png"
            link="/visualizar/porto"/>
        </ListGroup>
      </div>
    );
  }
}

export default QueryRoot;
