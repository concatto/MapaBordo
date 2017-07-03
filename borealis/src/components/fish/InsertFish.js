import React from 'react';
import { connect } from 'react-redux';
import { postFish } from '../../actions';
import FishForm from './FishForm';
import { PageHeader } from 'react-bootstrap';

class InsertFish extends React.Component {
  onSubmit(data) {
    this.props.postFish(data);
  }

  render() {
    return (
      <div className="entity-information">
        <PageHeader>Nova espécie</PageHeader>
        <FishForm busy={this.props.busy} onSubmit={(d) => this.onSubmit(d)}/>
      </div>
    );
  }
};

export default connect((state) => ({
  busy: state.post.busy
}), {postFish})(InsertFish);
