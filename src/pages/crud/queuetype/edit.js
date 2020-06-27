import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { StdRow, StdCol } from '../../../styles/main';
import * as Yup from 'yup';

import api from '../../../services/api.js';
import { setMessage } from '../../../services/msg.js';

import { PageContainer, PageHeader, Form } from '../crud-styles';

class EditQueueType extends Component {
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

  handleEdit = async e => {
    e.preventDefault();
    const schema = Yup.object().shape({
      description: Yup.string().required('Descrição deve ser preenchida')
    });
    let oThis = this;
    const { description } = this.state;
    schema
      .validate({ description })
      .then(async valid => {
        try {
          await api.put(`/queuetypes/${this.state.id}`, valid);
          setMessage('Tipo de Fila alterado com sucesso');
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
              Nenhuma tipo de fila cadastrado
            </Alert>
          </div>
        )}
        <>
          <StdRow sm={12}>
            <StdCol sm={12}>
              <PageHeader>
                <p>Alteração de Tipo de Fila </p>
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
              <label align="left">
                {this.state.company ? this.state.company : '????'}
              </label>
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

export default EditQueueType;
