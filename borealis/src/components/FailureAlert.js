import React from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FailureAlert = () => (
  <Alert bsStyle="danger">
    <h4><strong>Falha na comunicação com o servidor.</strong></h4>
    <p>
      Foi impossível estabelecer uma conexão com a base de dados.
      Em caso de dúvidas, entre em contato com o <Link to="/sobre" className="alert-link">administrador</Link>.
    </p>
  </Alert>
);

export default FailureAlert;
