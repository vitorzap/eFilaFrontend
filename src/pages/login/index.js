import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

import api from '../../services/api.js';
import { login, isAuthenticated } from '../../services/auth.js';

import Logo from '../../assets/eFilaA.gif';

import { StdContainer, StdCol } from '../../styles/main';
import { LoginRow, Form, LoginTitle, BtnSubmit } from './styles';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: ''
  };

  handleLogin = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: 'Preencha e-mail e senha para continuar!' });
    } else {
      try {
        const response = await api.post('/login', { email, password });
        login(response.data);
        if (this.props.location.state) {
          this.props.history.push(this.props.location.state.from.pathname);
        } else {
          this.props.history.push('/');
        }
      } catch (err) {
        this.setState({
          error: 'Login não realizado, email e senha não conferem'
        });
      }
    }
  };

  render() {
    return (
      <StdContainer fluid={true}>
        <LoginRow>
          <StdCol></StdCol>
          <StdCol>
            <Form onSubmit={this.handleLogin}>
              <LoginTitle>
                <img src={Logo} alt="eFila logo" />
              </LoginTitle>
              {this.state.error && (
                <Alert variant="info" fade="false" show={true}>
                  {this.state.error}
                </Alert>
              )}
              {/* {this.state.error && <p>{this.state.error}</p>} */}
              <input
                type="email"
                placeholder="e-mail"
                onChange={e => this.setState({ email: e.target.value })}
              />
              <input
                type="password"
                placeholder="senha"
                onChange={e => this.setState({ password: e.target.value })}
              />
              <BtnSubmit type="submit">Entrar</BtnSubmit>
              {isAuthenticated() && (
                <>
                  <StdCol>
                    <hr />
                  </StdCol>
                  <Link to="/changePassword">
                    <p>Alterar senha</p>
                  </Link>
                </>
              )}
            </Form>
          </StdCol>
          <StdCol></StdCol>
        </LoginRow>
      </StdContainer>
    );
  }
}

export default withRouter(Login);
