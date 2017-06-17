import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Loader from './Loader';

class EntityList extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  mapContent() {
    return Object.values(this.props.data).map((value) => (
      this.props.contentMapper(value)
    ));
  }

  getContent() {
    if (this.props.data && Object.keys(this.props.data).length > 0) {
      return (
        <ListGroup className={this.props.className} onSelect={(key) => alert(key)}>
          {this.mapContent()}
        </ListGroup>
      );
    } else {
      return (
        <h4>{this.props.emptyMessage}</h4>
      );
    }
  }

  render() {
    return (
      <div className="entity-list">
        <Loader fetching={this.props.fetching}>
          {this.getContent()}
        </Loader>
      </div>
    );
  }
}

export default EntityList;
