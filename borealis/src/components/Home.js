import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import LinkButton from './LinkButton';

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="inner">
          <h1>Borealis</h1>
          <Row>
            <Col xs={12} md={4}>
              <h2>Cadastrar dados</h2>
              <p>Insira informações sobre viagens, portos, embarcações e espécies</p>
              <LinkButton to="/cadastrar">Navegar</LinkButton>
            </Col>
            <Col xs={12} md={4}>
              <h2>Visualizar informações</h2>
              <p>Visualize todas as informações registradas na base de dados do sistema</p>
              <LinkButton to="/visualizar">Velejar</LinkButton>
            </Col>
            <Col xs={12} md={4}>
              <h2>Conferir relatórios</h2>
              <p>Analise os dados das viagens cadastradas de maneira conveniente</p>
              <LinkButton to="/relatorios">Ir à cabine do capitão</LinkButton>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default connect(null)(Home);
