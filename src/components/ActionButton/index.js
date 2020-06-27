import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/AddBoxTwoTone';
import EditIcon from '@material-ui/icons/EditTwoTone';
import DeleteIcon from '@material-ui/icons/DeleteTwoTone';

class ActionButton extends Component {
  static propTypes = {
    kind: PropTypes.oneOf(['new', 'edit', 'delete']).isRequired,
    link: PropTypes.string.isRequired,
    id: PropTypes.number,
    param: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      is_root: PropTypes.bool
    })
  };

  render() {
    return (
      <Link
        to={{
          pathname: this.props.link,
          state: {
            param: this.props.param
          }
        }}
      >
        <IconButton
          style={{
            width: '24px',
            height: '24px',
            padding: '0px'
          }}
        >
          {this.props.kind === 'new' && <CreateIcon />}
          {this.props.kind === 'edit' && <EditIcon />}
          {this.props.kind === 'delete' && <DeleteIcon />}
        </IconButton>
      </Link>
    );
  }
}

export default ActionButton;
