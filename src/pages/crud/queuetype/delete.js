import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { StdRow, StdCol } from '../../../styles/main';

import api from '../../../services/api.js';
import { setMessage } from '../../../services/msg.js';

import { PageContainer, PageHeader, Form } from '../crud-styles';

class DeleteQueueType extends Component {
  state = {
    id: '',
    description: '',
    company: '',
    companyId: 0,
    error: ''
  };

  async componentDidMount() {
    const { queuetype } = this.props.location.state.param;
    this.setState({ id: queuetype.id });
    this.setState({ description: queuetype.description });
    this.setState({ company: queuetype.company.name });
    this.setState({ companyId: queuetype.company.id });
  }

  handleDelete = async e => {
    e.preventDefault();
    try {
      await api.delete(`/queuetypes/${this.state.id}`);
      setMessage('Tipo de Fila excluído com sucesso');
      this.props.history.push('/queuetypes');
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
              Nenhum tipo de fila cadastrado
            </Alert>
          </div>
        )}
        <>
          <StdRow sm={12}>
            <StdCol sm={12}>
              <PageHeader>
                <p>Exclusão de Tipo de Fila</p>
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
              <label align="left">{this.state.description}</label>
            </StdCol>
          </StdRow>
          <StdRow sm={12}>
            <StdCol sm={1}>
              <label>Empresa:</label>
            </StdCol>
            <StdCol sm={5}>
              <label align="left">
                {this.state.company ? this.state.company : '????'}
              </label>
            </StdCol>
          </StdRow>
          <StdRow sm={12}>
            <StdCol sm={1}>
              <button type="submit">Excluir</button>
            </StdCol>
            <StdCol sm={1}>
              <button type="button">
                <Link to="/queuetypes">Cancelar</Link>
              </button>
            </StdCol>
          </StdRow>
        </Form>
      </PageContainer>
    );
  }
}

export default DeleteQueueType;
