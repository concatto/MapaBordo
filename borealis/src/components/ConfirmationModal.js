import React from 'react';
import { Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { closeModal } from '../actions';

class ConfirmationModal extends React.Component {
  render() {
    const { closeModal, name, message, open, disabled, onAccept } = this.props;

    return (
      <Modal show={open} onHide={() => closeModal(name)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => closeModal(name)}>Cancelar</Button>
          <Button bsStyle="danger" disabled={disabled} onClick={onAccept}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const stateMapper = (state, ownProps) => ({
  ...state.modal[ownProps.name],
  ...ownProps,
});

export default connect(stateMapper, {closeModal})(ConfirmationModal);
