import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button } from 'react-bootstrap';

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Grid>
          <Row>
            <Col xs={10} xsOffset={1}>
              <div className="inner">
                <h1>Borealis</h1>
                <Row>
                  <Col xs={12} md={4}>
                    <h2>Cadastrar dados</h2>
                    <p>Insira informações sobre viagens, portos, embarcações e espécies</p>
                    <Button>Navegar</Button>
                  </Col>
                  <Col xs={12} md={4}>
                    <h2>Visualizar informações</h2>
                    <p>Visualize todas as informações registradas na base de dados do sistema</p>
                    <Button>Velejar</Button>
                  </Col>
                  <Col xs={12} md={4}>
                    <h2>Conferir relatórios</h2>
                    <p>Analise os dados das viagens cadastradas de maneira conveniente</p>
                    <Button>Ir à cabine do capitão</Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default connect(null)(Home);
