import React from 'react';
import { connect } from 'react-redux';
import { fetchGeneralSummary } from '../actions';

class GeneralSummary extends React.Component {
  componentDidMount() {
    this.props.fetchGeneralSummary();
  }

  render() {
    return (
      <div>Um dia vai ter um relatório aqui</div>
    );
  }
}

export default connect(undefined, {fetchGeneralSummary})(GeneralSummary);
