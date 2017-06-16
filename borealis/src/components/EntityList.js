import React from 'react';
import { PageHeader, ListGroup } from 'react-bootstrap';
import Loader from './Loader';

class EntityList extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  getContent() {
    if (this.props.content && this.props.content.length > 0) {
      return (
        <ListGroup className={this.props.className} onSelect={(key) => alert(key)}>
          {this.props.content}
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
