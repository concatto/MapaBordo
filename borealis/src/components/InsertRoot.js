import React from 'react';
import { PageHeader, ListGroup } from 'react-bootstrap';
import ActionCard from './ActionCard';

class InsertRoot extends React.Component {
  render() {
    return (
      <div>
        <PageHeader>Cadastrar dados</PageHeader>
        <ListGroup className="action-group">
          <ActionCard
            title="Cadastrar nova viagem"
            image="/assets/viagem.png"
            link="/cadastrar/viagem"/>
          <ActionCard
            title="Cadastrar embarcação"
            image="/assets/barco.png"
            link="/cadastrar/embarcacao"/>
          <ActionCard
            title="Cadastrar espécie"
            image="/assets/peixe.png"
            link="/cadastrar/especie"/>
          <ActionCard
            title="Cadastrar porto"
            image="/assets/porto.png"
            link="/cadastrar/porto"/>
        </ListGroup>
      </div>
    );
  }
}

export default InsertRoot;
