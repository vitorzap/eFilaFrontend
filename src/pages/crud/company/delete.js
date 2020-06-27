import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { StdRow, StdCol } from '../../../styles/main';

import api from '../../../services/api.js';
import { setMessage, clearMessage } from '../../../services/msg.js';

import { PageContainer, PageHeader, Form } from '../crud-styles';

class DeleteCompany extends Component {
  state = {
    id: '',
    name: '',
    email: '',
    isRoot: '',
    error: ''
  };

  async componentDidMount() {
    clearMessage();
    const { company } = this.props.location.state.param;
    this.setState({ id: company.id });
    this.setState({ name: company.name });
    this.setState({ email: company.email });
    this.setState({ isRoot: company.is_root ? 'Sim' : 'Não' });
  }

  handleDelete = async e => {
    e.preventDefault();
    try {
      await api.delete(`/companies/${this.state.id}`);
      setMessage('Empresa excluída com sucesso');
      this.props.history.push('/companies');
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
              Nenhuma empresa cadastrada
            </Alert>
          </div>
        )}
        <>
          <StdRow sm={12}>
            <StdCol sm={12}>
              <PageHeader>
                <p>Exclusão de Empresa</p>
              </PageHeader>
            </StdCol>
          </StdRow>
        </>
        <Form onSubmit={this.handleDelete}>
          <StdRow sm={12}>
            <StdCol sm={1}>
              <label>Nome:</label>
            </StdCol>
            <StdCol sm={5}>
              <label align="left">{this.state.name}</label>
            </StdCol>
          </StdRow>
          <StdRow sm={12}>
            <StdCol sm={1}>
              <label>Email:</label>
            </StdCol>
            <StdCol sm={5}>
              <label align="left">{this.state.email}</label>
            </StdCol>
          </StdRow>
          <StdRow sm={12}>
            <StdCol sm={1}>
              <label>É root: </label>
            </StdCol>
            <StdCol sm={1}>
              <label align="left">{this.state.email}</label>
            </StdCol>
          </StdRow>
          <StdRow sm={12}>
            <StdCol sm={1}>
              <button type="submit">Excluir</button>
            </StdCol>
            <StdCol sm={1}>
              <button type="button">
                <Link to="/companies">Cancelar</Link>
              </button>
            </StdCol>
          </StdRow>
        </Form>
      </PageContainer>
    );
  }
}

export default DeleteCompany;
