import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as generalConstants from '../../../constants/general';
import Alert from 'react-bootstrap/Alert';
import { StdRow, StdCol } from '../../../styles/main';
import * as Yup from 'yup';

import api from '../../../services/api.js';
import { setMessage, clearMessage } from '../../../services/msg.js';

import {
  getLoggedUserType,
  getLoggedUserCompanyId
} from '../../../services/auth';

import { PageContainer, PageHeader, Form } from '../crud-styles';

class EditQueue extends Component {
  state = {
    id: '',
    description: '',
    company: '',
    companyId: 0,
    companyOptions: [],
    queueType: '',
    queueTypeId: 0,
    queueTypeOptions: [],
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
    if (getLoggedUserType() === generalConstants.USER_ROOT) {
      this.getCompanies();
      this.getQueueTypes(queue.company.id);
    } else {
      this.getQueueTypes(getLoggedUserCompanyId());
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

  async getQueueTypes(companyId) {
    try {
      const response = await api.get(`listqueuetypes?companyid=${companyId}`);
      const items = response.data;
      if (items.length === 1) {
        this.setState({ queueTypeId: items[0].id });
        this.setState({ queueType: items[0].description });
      }
      this.setState({ queueTypeOptions: items });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  handleEdit = async e => {
    e.preventDefault();
    const schema = Yup.object().shape({
      description: Yup.string().required('Descrição deve ser preenchida'),
      company_id: Yup.number().moreThan(0, 'Não foi selecionada uma empresa'),
      queue_type_id: Yup.number().moreThan(
        0,
        'Não foi selecionado um Tipo de Fila'
      )
    });
    let oThis = this;
    const {
      description,
      companyId: company_id,
      queueTypeId: queue_type_id
    } = this.state;
    schema
      .validate({ description, company_id, queue_type_id })
      .then(async valid => {
        try {
          await api.put(`/queues/${this.state.id}`, valid);
          setMessage('Fila alterada com sucesso');
          this.props.history.push('/queues');
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
              Nenhuma fila cadastrada
            </Alert>
          </div>
        )}
        <>
          <StdRow sm={12}>
            <StdCol sm={12}>
              <PageHeader>
                <p>Alteração de Fila</p>
              </PageHeader>
            </StdCol>
          </StdRow>
        </>
        <Form onSubmit={this.handleEdit}>
          <StdRow sm={12}>
            <StdCol sm={1}>
              <label>Descrição:</label>
            </StdCol>
            <StdCol sm={5}>
              <input
                type="text"
                value={this.state.description}
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
                  onChange={e => {
                    this.setState({ queueTypeId: 0 });
                    this.setState({ queueType: '' });
                    this.getQueueTypes(e.target.value);
                    this.setState({ companyId: e.target.value });
                  }}
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
              <label>Tipo de Fila:</label>
            </StdCol>
            <StdCol sm={5}>
              {this.state.queueTypeOptions.length > 1 ? (
                <select
                  value={this.state.queueTypeId}
                  onChange={e => this.setState({ queueTypeId: e.target.value })}
                >
                  <option key={0} value={0}>
                    {'Escolha um Tipo de Fila'}
                  </option>
                  {this.state.queueTypeOptions.map((queueType, index) => (
                    <option key={queueType.id} value={queueType.id}>
                      {queueType.description}
                      {' - '}
                      {queueType.id}
                    </option>
                  ))}
                </select>
              ) : (
                <label align="left">
                  {this.state.queueType ? this.state.queueType : '????'}
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
                <Link to="/queues">Cancelar</Link>
              </button>
            </StdCol>
          </StdRow>
        </Form>
      </PageContainer>
    );
  }
}

export default EditQueue;
