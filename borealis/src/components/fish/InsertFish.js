import React from 'react';
import { withFileChooser } from '../../utils';
import { Image, PageHeader } from 'react-bootstrap';
import ValidatedInput from '../ValidatedInput';

const ImageChooser = withFileChooser(Image);

class InsertFish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      profundidade_min: "",
      profundidade_max: "",
      fotos: []
    };
  }

  render() {
    return (
      <div className="entity-information">
        <PageHeader>Nova espécie</PageHeader>
        <ValidatedInput numeric/>
      </div>
    );
  }
};

export default InsertFish;
