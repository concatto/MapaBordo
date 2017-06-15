import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class LinkButton extends React.Component {
  handleClick(e) {
    e.preventDefault();
    this.props.push(this.props.to);
  }

  render() {
    const { to, children, push, ...others } = this.props;

    return (
      <Button href={to} onClick={(e) => this.handleClick(e)} {...others}>
        {children}
      </Button>
    );
  }
}

export default connect(null, {push})(LinkButton);
