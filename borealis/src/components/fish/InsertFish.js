import React from 'react';
import { withFileChooser } from '../../utils';
import { Thumbnail, PageHeader, Col, Row, Button } from 'react-bootstrap';
import ValidatedInput from '../ValidatedInput';
import Input from '../Input';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { postFish } from '../../actions';

const ImageChooser = withFileChooser(Thumbnail);

class ImageGroup extends React.Component {
  handleChoose(data, shouldAdd, index) {
    const reader = new FileReader();

    reader.onload = (e) => {
      this.props.fields.push({image: e.target.result});

      if (!shouldAdd) {
        this.props.fields.swap(index, this.props.fields.length - 1);
        this.props.fields.pop();
      }
    };

    reader.readAsDataURL(data);
  }

  render() {
    const { fields } = this.props;

    const images = fields.map((item, index, fields) => {
      const source = fields.get(index).image;

      return (
        <Col xs={3} key={index}>
          <ImageChooser onChoose={(d) => this.handleChoose(d, false, index)} src={source}/>
        </Col>
      );
    });

    return (
      <div>
        <h3>Fotografias</h3>
        <Row className="fish-photos">
          {images}
          <Col xs={3}>
            <ImageChooser onChoose={(d) => this.handleChoose(d, true)} className="add-fish" src="/assets/plus.png"/>
          </Col>
        </Row>
      </div>
    );
  }
};

class FishForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Row>
          <Field name="name" label="Nome" component={Input} width={8}/>
        </Row>
        <Row>
          <Field type="number" real name="minDepth" label="Profundidade mínima" component={Input} width={4}/>
          <Field type="number" real name="maxDepth" label="Profundidade máxima" component={Input} width={4}/>
        </Row>
        <FieldArray component={ImageGroup} name="photos"/>
        <Button type="submit" bsStyle="success">Cadastrar</Button>
      </form>
    );
  }
}

const FishFormContainer = reduxForm({form: 'fish'})(FishForm);

class InsertFish extends React.Component {
  onSubmit(data) {
    this.props.postFish(data);
  }

  render() {
    return (
      <div className="entity-information">
        <PageHeader>Nova espécie</PageHeader>
        <FishFormContainer onSubmit={(d) => this.onSubmit(d)}/>
      </div>
    );
  }
};

export default connect(undefined, {postFish})(InsertFish);
