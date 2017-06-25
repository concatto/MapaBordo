import React from 'react';
import Input from '../Input';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Thumbnail, Col, Row, Button } from 'react-bootstrap';
import { withFileChooser } from '../../utils';

const handleChoose = (data, shouldAdd, obj) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    if (shouldAdd) {
      obj.push({image: e.target.result});
    } else {
      obj.onChange(e.target.result);
    }
  };

  reader.readAsDataURL(data);
}

const ImageChooser = withFileChooser(Thumbnail);
const ImageField = ({input}) => {
  return (
    <ImageChooser onChoose={(d) => handleChoose(d, false, input)} src={input.value}/>
  );
}

class ImageGroup extends React.Component {
  render() {
    const { fields } = this.props;

    const images = fields.map((item, index, fields) => {
      return (
        <Col xs={3} key={index}>
          <Field name={item + ".image"} component={ImageField}/>
        </Col>
      );
    });

    return (
      <div>
        <h3>Fotografias</h3>
        <Row className="fish-photos">
          {images}
          <Col xs={3}>
            <ImageChooser onChoose={(d) => handleChoose(d, true, fields)} className="add-fish" src="/assets/plus.png"/>
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

export default reduxForm({form: 'fish'})(FishForm);
