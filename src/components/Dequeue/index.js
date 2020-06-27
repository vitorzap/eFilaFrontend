import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api.js';
import Modal from 'react-bootstrap/Modal';
//import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { ColButton, Label, P, Button } from './styles';
import { StdRow, StdCol } from '../../styles/main';

class Dequeue extends Component {
  static propTypes = {
    queue: PropTypes.object.isRequired,
    first: PropTypes.object.isRequired
  };
  state = {
    show: false,
    error: '',
    queue_id: 0
  };

  async componentDidMount() {
    this.setState({ queue_id: this.props.queue.queue_id });
  }

  handleShow = e => {
    this.setState({ show: true });
  };

  handleClose = e => {
    this.setState({ show: false });
  };

  handleDequeue = e => {
    e.preventDefault();
    console.log('Dequeue');
    this.deQueue(this.props.queue, this.props.caller);
    this.setState({ show: false });
  };

  async deQueue(queue) {
    try {
      await api.delete(`/oppositions/${queue._id}`);
    } catch (err) {
      console.log(err.message);
      if (err.response) {
        const { error: msgErro } = err.response.data;
        this.setState({ error: msgErro });
      } else {
        this.setState({ error: err.message });
        console.log('ERRO ==>', err.message);
      }
    }
    console.log('Saindo do Apagando');
  }

  render() {
    return (
      <>
        <ColButton variant="primary" onClick={this.handleShow}>
          Atender
        </ColButton>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>ATENDER - {this.props.queue.description} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.error && (
              <Alert variant="info" fade="false" show={true}>
                {this.state.error}
              </Alert>
            )}
            <StdRow sm={12}>
              <StdCol sm={3}>
                <Label>Nome:</Label>
              </StdCol>
              <StdCol sm={9}>
                <P>{this.props.first.name}</P>
              </StdCol>
            </StdRow>
            <StdRow sm={12}>
              <StdCol sm={3}>
                <Label>Telefone:</Label>
              </StdCol>
              <StdCol sm={9}>
                <P>{this.props.first.phone}</P>
              </StdCol>
            </StdRow>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleDequeue}>
              Atender
            </Button>
            <Button
              variant="secondary"
              value={this.props.queue._id}
              onClick={this.handleClose}
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Dequeue;
