import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchFishes, deleteFish, openModal } from '../../actions';
import ConfirmationModal from '../ConfirmationModal';
import Loader from '../Loader';
import { PageHeader, Panel, Button, Row, Col, Thumbnail } from 'react-bootstrap';

class FishInformation extends React.Component {
  componentDidMount() {
    this.props.fetchFishes(this.props.match.params.id);
  }

  mapPhotosToComponents() {
    return this.props.fish.fotos.map((photo) => {
      const path = "http://localhost:4000" + photo.caminho;

      return (
        <Col xs={6} md={3} key={photo.id}>
          <Thumbnail src={path} href={path} target="_blank"/>
        </Col>
      );
    });
  }

  getContent() {
    const { fish, deleteFish, openModal } = this.props;

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
          <Button bsStyle="danger" onClick={() => openModal("fish-modal")}>
            Excluir espécie
          </Button>

          <ConfirmationModal
            name="fish-modal"
            message="A espécie e todas as fotografias relacionadas serão removidas. Deseja prosseguir?"
            onAccept={() => deleteFish(fish.id)}
          />
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

export default withRouter(connect(stateMapper, {fetchFishes, deleteFish, openModal})(FishInformation));
