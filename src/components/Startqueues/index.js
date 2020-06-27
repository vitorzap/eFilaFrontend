import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api.js';
import { setMessage } from '../../services/msg.js';
import Modal from 'react-bootstrap/Modal';
import { logout } from '../../services/auth';
import { Button } from './styles';
import { HeaderButton } from '../../pages/Operation/QueueMgmt/styles';

class Startqueues extends Component {
  static propTypes = {
    noQueues: PropTypes.number.isRequired
  };
  state = {
    show: false
  };

  handleShow = e => {
    this.setState({ show: true });
  };

  handleClose = e => {
    this.setState({ show: false });
  };

  handleStartQueues = e => {
    e.preventDefault();
    console.log('StartQueues');
    this.startQueues();
    this.setState({ show: false });
  };

  async startQueues() {
    console.log('startQueues <====================================');
    let msgErro = '';
    try {
      await api.post('opqueues');
    } catch (err) {
      this.state.errorLevel = 'danger';
      if (err.response) {
        const { error } = err.response.data;
        if (error === 'Usuario não autorizado') {
          logout();
        }
        msgErro = `response - ${error}`;
      } else {
        msgErro = `Outro - ${err.message}`;
      }
      setMessage(msgErro);
      this.handleClose();
    }
  }

  render() {
    const lblDo = this.props.noQueues === 0 ? 'Iniciar' : 'Reniciar';
    return (
      <>
        <HeaderButton onClick={this.handleShow}>{lblDo}</HeaderButton>{' '}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title> INICIAR FILAS </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.noQueues === 0 && (
              <p>Nenhuma fila iniciada neste momento. Iniciar ?</p>
            )}
            {this.props.noQueues > 0 && (
              <p>
                Existe(m) {this.props.noQueues} fila iniciadas neste momento.
                <br />
                Reiniciar ?
              </p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleStartQueues}>
              {lblDo}
            </Button>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Startqueues;
