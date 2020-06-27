import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { StdRow, StdCol } from '../../../styles/main';
import * as Yup from 'yup';

import api from '../../../services/api.js';
import { setMessage, clearMessage } from '../../../services/msg.js';

import { PageContainer, PageHeader, Form } from '../crud-styles';

class EditCompany extends Component {
  state = {
    id: '',
    name: '',
    email: '',
    isRoot: 'N',
    error: ''
  };

  async componentDidMount() {
    clearMessage();
    const { company } = this.props.location.state.param;
    this.setState({ id: company.id });
    this.setState({ name: company.name });
    this.setState({ email: company.email });
    this.setState({ isRoot: company.is_root ? 'S' : 'N' });
  }

  handleEdit = async e => {
    e.preventDefault();
    const schema = Yup.object().shape({
      name: Yup.string().required('Nome deve ser preenchido'),
      email: Yup.string()
        .required('email deve ser preenchido')
        .email('formato inválido para email'),
      is_root: Yup.bool('É root => opção inválida')
    });
    let oThis = this;
    const { name, email, isRoot } = this.state;
    const is_root = isRoot === 'S' ? true : false;
    schema
      .validate({ name, email, is_root })
      .then(async valid => {
        try {
          await api.put(`/companies/${this.state.id}`, valid);
          setMessage('Empresa alterada com sucesso');
          this.props.history.push('/companies');
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
        oThis.setState({ error: errMsg });
      });
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
                <p>Alteração de Empresa </p>
              </PageHeader>
            </StdCol>
          </StdRow>
        </>
        <Form onSubmit={this.handleEdit}>
          <StdRow sm={12}>
            <StdCol sm={1}>
              <label>Nome:</label>
            </StdCol>
            <StdCol sm={5}>
              <input
                type="text"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
              />
            </StdCol>
          </StdRow>
          <StdRow sm={12}>
            <StdCol sm={1}>
              <label>Email:</label>
            </StdCol>
            <StdCol sm={5}>
              <input
                type="email"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
            </StdCol>
          </StdRow>
          <StdRow sm={12}>
            <StdCol sm={1}>
              <label>É root: </label>
            </StdCol>
            <StdCol sm={1}>
              <label>Sim: </label>
            </StdCol>
            <StdCol sm={1}>
              <input
                type="radio"
                name="isroot"
                label="Sim"
                checked={this.state.isRoot === 'S'}
                value={'S'}
                onChange={e => this.setState({ isRoot: e.target.value })}
              />
            </StdCol>
            <StdCol sm={1}>
              <label>Não: </label>
            </StdCol>
            <StdCol sm={1}>
              <input
                type="radio"
                name="isroot"
                label="Não"
                checked={this.state.isRoot === 'N'}
                value={'N'}
                onChange={e => this.setState({ isRoot: e.target.value })}
              />
            </StdCol>
          </StdRow>
          <StdRow sm={12}>
            <StdCol sm={1}>
              <button type="submit">Salvar</button>
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

export default EditCompany;
