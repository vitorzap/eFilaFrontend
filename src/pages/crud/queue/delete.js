import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { StdRow, StdCol } from '../../../styles/main';

import api from '../../../services/api.js';
import { setMessage, clearMessage } from '../../../services/msg.js';

import { PageContainer, PageHeader, Form } from '../crud-styles';

class DeleteQueue extends Component {
  state = {
    id: '',
    description: '',
    company: '',
    companyId: 0,
    queueType: '',
    queueTypeId: 0,
    error: ''
  };

  async componentDidMount() {
    clearMessage();
    const { queue } = this.props.location.state.param;
    this.setState({ id: queue.id });
    this.setState({ description: queue.description });
    this.setState({ email: queue.email });
    this.setState({ isRoot: queue.is_root });
    this.setState({ company: queue.company.name });
    this.setState({ companyId: queue.company.id });
    this.setState({ queueType: queue.queue_type.description });
    this.setState({ queueTypeId: queue.queue_type.id });
  }

  handleDelete = async e => {
    e.preventDefault();
    try {
      await api.delete(`/queues/${this.state.id}`);
      setMessage('Tipo de Fila excluído com sucesso');
      this.props.history.push('/queues');
    } catch (err) {
      if (err.response) {
        const { error: msgErro } = err.response.data;
        this.setState({ error: msgErro });
      } else {
        this.setState({ error: err.message });
      }
    }
  };

  render() {
    return (
      <PageContainer fluid={true}>
        {this.state.error !== '' && (
          <div>
            <Alert variant="info" fade="false" show={true}>
              {this.state.error}
            </Alert>
          </div>
        )}
        {this.state.error === '' && this.state.totalItems === 0 && (
          <div>
            <Alert variant="danger" fade="false" show={true}>
              Nenhuma fila cadastrada
            </Alert>
          </div>
        )}
        <>
          <StdRow sm={12}>
            <StdCol sm={12}>
              <PageHeader>
                <p>Exclusão de Fila</p>
              </PageHeader>
            </StdCol>
          </StdRow>
        </>
        <Form onSubmit={this.handleDelete}>
          <StdRow sm={12}>
            <StdCol sm={1}>
              <label>Descrição:</label>
            </StdCol>
            <StdCol sm={5}>
              <label align="left">{this.state.description}</label>{' '}
            </StdCol>
          </StdRow>
          <StdRow sm={12}>
            <StdCol sm={1}>
              <label>Empresa:</label>
            </StdCol>
            <StdCol sm={5}>
              <label align="left">{this.state.company}</label>{' '}
            </StdCol>
          </StdRow>
          <StdRow sm={12}>
            <StdCol sm={1}>
              <label>Tipo de Fila:</label>
            </StdCol>
            <StdCol sm={5}>
              <label align="left">{this.state.queueType}</label>
            </StdCol>
          </StdRow>
          <StdRow sm={12}>
            <StdCol sm={1}>
              <button type="submit">Excluir</button>
            </StdCol>
            <StdCol sm={1}>
              <button type="button">
                <Link to="/queues">Cancelar</Link>
              </button>
            </StdCol>
          </StdRow>
        </Form>
      </PageContainer>
    );
  }
}

export default DeleteQueue;
