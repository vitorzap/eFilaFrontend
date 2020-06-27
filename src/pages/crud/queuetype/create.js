import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { StdRow, StdCol } from '../../../styles/main';
import * as Yup from 'yup';

import api from '../../../services/api.js';
import { setMessage } from '../../../services/msg.js';

import { PageContainer, PageHeader, Form } from '../crud-styles';

import * as generalConstants from '../../../constants/general';

import {
  getLoggedUserType,
  getLoggedUserCompanyId,
  getLoggedUserCompanyName
} from '../../../services/auth';

class CreateQueueType extends Component {
  state = {
    id: '',
    description: '',
    company: '',
    companyId: 0,
    companyOptions: [],
    error: ''
  };

  async componentDidMount() {
    if (getLoggedUserType() === generalConstants.USER_ROOT) {
      this.getCompanies();
    } else {
      this.setState({ company: getLoggedUserCompanyName() });
      this.setState({ companyId: getLoggedUserCompanyId() });
    }
  }

  async getCompanies() {
    try {
      const response = await api.get('listcompanies');
      const items = response.data;
      this.setState({ companyOptions: items });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  handleCreate = async e => {
    e.preventDefault();

    const schema = Yup.object().shape({
      description: Yup.string().required('Descrição deve ser preenchida'),
      company_id: Yup.number().moreThan(0, 'Não foi selecionada uma empresa')
    });
    let oThis = this;
    const { description, companyId: company_id } = this.state;
    schema
      .validate({ description, company_id })
      .then(async valid => {
        try {
          await api.post('/queuetypes', valid);
          setMessage('Tipo de Fila criado com sucesso');
          this.props.history.push('/queuetypes');
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
              Nenhum tipo de fila cadastrado
            </Alert>
          </div>
        )}
        <>
          <StdRow sm={12}>
            <StdCol sm={12}>
              <PageHeader>
                <p>Novo Tipo de Fila</p>
              </PageHeader>
            </StdCol>
          </StdRow>
        </>
        <Form onSubmit={this.handleCreate}>
          <StdRow sm={12}>
            <StdCol sm={1}>
              <label>Descrição:</label>
            </StdCol>
            <StdCol sm={5}>
              <input
                type="text"
                onChange={e => this.setState({ description: e.target.value })}
              />
            </StdCol>
          </StdRow>
          <StdRow sm={12}>
            <StdCol sm={1}>
              <label>Empresa:</label>
            </StdCol>
            <StdCol sm={5}>
              {this.state.companyOptions.length > 1 ? (
                <select
                  value={this.state.companyId}
                  onChange={e => this.setState({ companyId: e.target.value })}
                >
                  <option key={0} value={0}>
                    {'Escolha uma empresa'}
                  </option>
                  {this.state.companyOptions.map(company => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                      {' - '}
                      {company.id}
                    </option>
                  ))}
                </select>
              ) : (
                <label align="left">
                  {this.state.company ? this.state.company : '????'}
                </label>
              )}
            </StdCol>
          </StdRow>
          <StdRow sm={12}>
            <StdCol sm={1}>
              <button type="submit">Salvar</button>
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

export default CreateQueueType;
