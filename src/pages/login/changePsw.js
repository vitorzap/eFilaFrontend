import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Alert from 'react-bootstrap/Alert';

import api from '../../services/api.js';
import { getLoggedUserId } from '../../services/auth';

import Logo from '../../assets/eFilaA.gif';

import { StdContainer, StdCol } from '../../styles/main';
import { LoginRow, Form, LoginTitle } from './styles';
import { Btnbar, BtnSubmit, BtnCancel } from '../logout/styles';

class ChangePassword extends Component {
  state = {
    id: 0,
    oldPassword: '',
    password: '',
    confirmPassword: '',
    error: ''
  };

  async componentDidMount() {
    this.setState({ id: getLoggedUserId() });
  }

  handleChangePassword = async e => {
    e.preventDefault();
    const schema = Yup.object().shape({
      oldPassword: Yup.string()
        .required('Password anterior deve se informada')
        .min(6),
      password: Yup.string()
        .required('informe a nova senha')
        .min(6),
      confirmPassword: Yup.string()
        .required('informe a confirmação da senha')
        .oneOf([Yup.ref('password'), null], 'Senha não confirmada')
    });
    const { oldPassword, password, confirmPassword } = this.state;
    schema
      .validate({ oldPassword, password, confirmPassword })
      .then(async valid => {
        try {
          await api.put(`/users/${this.state.id}`, valid);
          this.props.history.push('/users');
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
  };

  render() {
    return (
      <StdContainer fluid={true}>
        <LoginRow>
          <StdCol></StdCol>
          <StdCol>
            <Form onSubmit={this.handleChangePassword}>
              <LoginTitle>
                <img src={Logo} alt="eFila logo" />
              </LoginTitle>
              {this.state.error && (
                <Alert variant="info" fade="false" show={true}>
                  {this.state.error}
                </Alert>
              )}
              <input
                type="password"
                placeholder="Senha anterior"
                onChange={e => this.setState({ oldPassword: e.target.value })}
              />
              <input
                type="password"
                placeholder="Nova senha"
                onChange={e => this.setState({ password: e.target.value })}
              />
              <input
                type="password"
                placeholder="confirme nova senha"
                onChange={e =>
                  this.setState({ confirmPassword: e.target.value })
                }
              />
              <Btnbar>
                <BtnSubmit type="submit">Entrar</BtnSubmit>
                <BtnCancel type="button">
                  <Link to="/">Cancelar</Link>
                </BtnCancel>
              </Btnbar>
            </Form>
          </StdCol>
          <StdCol></StdCol>
        </LoginRow>
      </StdContainer>
    );
  }
}

export default ChangePassword;
