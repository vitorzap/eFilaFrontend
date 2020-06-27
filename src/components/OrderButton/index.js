import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Btn } from './styles';
import SortedByIcon from '@material-ui/icons/ArrowDropDownTwoTone';

class OrderButton extends Component {
  static propTypes = {
    apiAction: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    newSortField: PropTypes.string,
    caller: PropTypes.object,
    actualSortField: PropTypes.string.isRequired,
    getPage: PropTypes.func.isRequired
  };

  render() {
    return (
      <>
        <Btn
          size="sm"
          onClick={e =>
            this.props.getPage(
              this.props.apiAction,
              1,
              this.props.newSortField,
              this.props.caller
            )
          }
        >
          {this.props.label}
        </Btn>{' '}
        {this.props.newSortField === this.props.actualSortField && (
          <SortedByIcon />
        )}
      </>
    );
  }
}

export default OrderButton;
