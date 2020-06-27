import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { logout, isAuthenticated } from '../../services/auth.js';

import Logo from '../../assets/eFilaA.gif';

import { StdContainer, StdCol } from '../../styles/main';
import { Btnbar, BtnSubmit, BtnCancel } from './styles';
import { LoginRow, Form, LoginTitle } from '../login/styles';

class Logout extends Component {
  handleLogout = e => {
    e.preventDefault();
    logout();
    this.props.history.push('/');
  };

  render() {
    return (
      // <LogoutContainer>
      <StdContainer fluid={true}>
        <LoginRow sm={12}>
          <StdCol></StdCol>
          <StdCol sm={4} />
          <StdCol sm={4}>
            <Form onSubmit={this.handleLogout}>
              <LoginTitle>
                <img src={Logo} alt="eFila logo" />
                <p>Tem certeza que deseja sair ?</p>
              </LoginTitle>
              <Btnbar>
                <BtnSubmit type="submit">Sair</BtnSubmit>
                <BtnCancel type="button">
                  <Link to="/">Cancelar</Link>
                </BtnCancel>
              </Btnbar>
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
          <StdCol sm={4} />
        </LoginRow>
      </StdContainer>
    );
  }
}

export default withRouter(Logout);
