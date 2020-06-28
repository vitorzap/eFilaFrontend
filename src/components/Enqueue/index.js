import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import api from '../../services/api.js';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { ColButton, Form } from './styles';
import { StdRow, StdCol } from '../../styles/main';

class EnQueue extends Component {
  static propTypes = {
    queue: PropTypes.object.isRequired
  };
  state = {
    show: false,
    error: '',
    queue_id: 0,
    name: '',
    phone: ''
  };

  async componentDidMount() {
    this.setState({ queue_id: this.props.queue.queue_id });
  }

  handleShow = e => {
    this.setState({ error: '' });
    this.setState({ show: true });
  };

  handleClose = e => {
    this.setState({ show: false });
  };

  handleEnqueue = e => {
    e.preventDefault();
    this.enQueue(this.props.queue);
  };

  async enQueue(queue) {
    const schema = Yup.object().shape({
      queue_id: Yup.number()
        .required()
        .positive()
        .integer(),
      name: Yup.string().required('Nome deve ser preenchido'),
      phone: Yup.string()
        .required('Telefone deve ser preenchido')
        .min(9, 'Telefone deve ter ao menos 9 digitos'),
      email: Yup.string()
        .required('Email deve ser preenchido')
        .email('Formato inválido para email')
    });
    const { queue_id, name, phone, email } = this.state;
    schema
      .validate({ queue_id, name, phone, email })
      .then(async valid => {
        try {
          await api.post('/oppositions', valid);
        } catch (err1) {
          if (err1.response) {
            const { error: msgErro } = err1.response.data;
            this.setState({ error: msgErro });
          } else {
            this.setState({ error: err1.message });
          }
        }
      })
      .catch(err2 => {
        const errMsg = err2.errors;
        this.setState({ error: errMsg });
      });
  }

  render() {
    return (
      <>
        <ColButton variant="primary" onClick={this.handleShow}>
          Incluir
        </ColButton>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>INCLUIR - {this.props.queue.description} </Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.handleEnqueue}>
            <Modal.Body>
              {this.state.error && (
                <Alert variant="info" fade="false" show={true}>
                  {this.state.error}
                </Alert>
              )}
              <StdRow sm={12}>
                <StdCol sm={2}>
                  <label>Nome:</label>
                </StdCol>
                <StdCol sm={8}>
                  <input
                    type="text"
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                </StdCol>
              </StdRow>
              <StdRow sm={12}>
                <StdCol sm={2}>
                  <label>Telefone:</label>
                </StdCol>
                <StdCol sm={6}>
                  <input
                    type="text"
                    onChange={e => this.setState({ phone: e.target.value })}
                  />
                </StdCol>
              </StdRow>
              <StdRow sm={12}>
                <StdCol sm={2}>
                  <label>Email:</label>
                </StdCol>
                <StdCol sm={8}>
                  <input
                    type="email"
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </StdCol>
              </StdRow>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" variant="primary">
                {/* <Button type="submit" variant="primary"> */}
                Salvar
              </Button>
              <Button variant="secondary" onClick={this.handleClose}>
                Cancelar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
}

export default EnQueue;
