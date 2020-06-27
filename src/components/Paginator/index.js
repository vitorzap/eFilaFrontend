import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Paginator extends Component {
  static propTypes = {
    apiAction: PropTypes.string.isRequired,
    pageNumbers: PropTypes.arrayOf(PropTypes.number).isRequired,
    order: PropTypes.string.isRequired,
    getPage: PropTypes.func.isRequired,
    caller: PropTypes.object
  };

  render() {
    return this.props.pageNumbers.map((page, index) => (
      <p
        key={Math.abs(page)}
        onClick={e =>
          this.props.getPage(
            this.props.apiAction,
            Math.abs(page),
            this.props.order,
            this.props.caller
          )
        }
      >
        {String.fromCharCode(20)}
        {page > 0 ? `${Math.abs(page)}` : `(${Math.abs(page)})`}
        {String.fromCharCode(20)}
        {index !== this.props.pageNumbers.length - 1 &&
          String.fromCharCode(124)}
      </p>
    ));
  }
}

export default Paginator;
