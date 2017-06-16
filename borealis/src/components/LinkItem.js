import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class LinkItem extends React.Component {
  handleClick(e) {
    e.preventDefault();
    this.props.push(this.props.to);
  }

  render() {
    const { to, children, push, ...others } = this.props;

    return (
      <ListGroupItem href={to} onClick={(e) => this.handleClick(e)} {...others}>
        {children}
      </ListGroupItem>
    );
  }
}

export default connect(null, {push})(LinkItem);
