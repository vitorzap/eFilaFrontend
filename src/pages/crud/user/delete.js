import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { StdRow, StdCol } from '../../../styles/main';

import api from '../../../services/api.js';
import { setMessage } from '../../../services/msg.js';

import { PageContainer, PageHeader, Form } from '../crud-styles';

class DeleteUser extends Component {
  state = {
    id: '',
    name: '',
    email: '',
    isRoot: '',
    company: '',
    companyId: 0,
    error: ''
  };

  async componentDidMount() {
    const { user } = this.props.location.state.param;
    this.setState({ id: user.id });
    this.setState({ name: user.name });
    this.setState({ email: user.email });
    this.setState({ isRoot: user.is_root ? 'Sim' : 'Não' });
    this.setState({ company: user.company.name });
    this.setState({ companyId: user.company.id });
  }

  handleDelete = async e => {
    e.preventDefault();
    try {
      await api.delete(`/users/${this.state.id}`);
      setMessage('Usuário excluído com sucesso');
      this.props.history.push('/users');
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
              Nenhum usuário cadastrado
            </Alert>
          </div>
        )}
        <>
          <StdRow sm={12}>
            <StdCol sm={12}>
              <PageHeader>
                <p>Exclusão de Usuário</p>
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
              <label align="left">{this.state.name}</label>{' '}
            </StdCol>
          </StdRow>
          <StdRow sm={12}>
            <StdCol sm={1}>
              <label>Email:</label>
            </StdCol>
            <StdCol sm={5}>
              <label align="left">{this.state.email}</label>{' '}
            </StdCol>
          </StdRow>
          <StdRow sm={12}>
            <StdCol sm={1}>
              <label>É root: </label>
            </StdCol>
            <StdCol sm={1}>
              <label align="left">{this.state.isRoot}</label>
            </StdCol>
          </StdRow>
          <StdRow sm={12}>
            <StdCol sm={1}>
              <button type="submit">Excluir</button>
            </StdCol>
            <StdCol sm={1}>
              <button type="button">
                <Link to="/users">Cancelar</Link>
              </button>
            </StdCol>
          </StdRow>
        </Form>
      </PageContainer>
    );
  }
}

export default DeleteUser;
