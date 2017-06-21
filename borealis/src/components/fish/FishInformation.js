import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchFishes } from '../../actions';
import Loader from '../Loader';
import { PageHeader, Panel, Button, Row, Col, Thumbnail, Glyphicon } from 'react-bootstrap';

class FishInformation extends React.Component {
  componentDidMount() {
    this.props.fetchFishes(this.props.match.params.id);
  }

  mapPhotosToComponents() {
    return this.props.fish.fotos.map((photo) => (
      <Col xs={6} md={3} key={photo.id}>
        <Thumbnail src={photo.caminho} href={photo.caminho} target="_blank"/>
        <Button bsStyle="danger"><Glyphicon glyph="trash"/></Button>
      </Col>
    ));
  }
  
  getContent() {
    const { fish } = this.props;
    
    if (fish) {
      return (
        <div>
          <PageHeader>{fish.nome}</PageHeader>
          <p>Profundidade mínima: {fish.profundidade_min} metros</p>
          <p>Profundidade máxima: {fish.profundidade_max} metros</p>
          {fish.fotos.length > 0 &&
            <div className="fish-photos">
              <h3>Fotografias</h3>
              <Row>
                {this.mapPhotosToComponents()}
              </Row>
            </div>
          }
          <Button bsStyle="danger">Excluir espécie</Button>
        </div>
      )
    } else {
      return (
        <Panel>
          <h4>Esta espécie não existe.</h4>
        </Panel>
      )
    }
  }

  render() {
    return (
      <div className="entity-information">
        <Loader fetching={this.props.fetching}>
          {this.getContent()}
        </Loader>
      </div>
    )
  }
}

const stateMapper = (state, ownProps) => ({
  fish: state.fishes.content ? state.fishes.content[ownProps.match.params.id] : undefined,
  fetching: state.fishes.fetching,
});

export default withRouter(connect(stateMapper, {fetchFishes})(FishInformation));
