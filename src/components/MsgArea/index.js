import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import { ShowMessage } from '../../services/msg';

class MsgArea extends Component {
  static propTypes = {
    totalItems: PropTypes.number,
    error: PropTypes.string
  };

  render() {
    return (
      <>
        {this.props.error && this.props.error !== '' && (
          <div>
            <Alert variant="info" fade="false" show={true}>
              {this.props.error}
            </Alert>
          </div>
        )}
        <ShowMessage />
        {this.props.error &&
          this.props.error === '' &&
          this.props.totalItems === 0 && (
            <div>
              <Alert variant="danger" fade="false" show={true}>
                Aguarde, recuperando informações
              </Alert>
            </div>
          )}
      </>
    );
  }
}

export default MsgArea;
