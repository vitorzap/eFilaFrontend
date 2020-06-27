import React, { Component } from 'react';
import { StdRow, StdCol } from '../../styles/main';
import Logo from '../../assets/eFilaA.gif';

import {
  getLoggedUserName,
  getLoggedUserCompanyName,
  getLoggedUserType
} from '../../services/auth';

import { HeaderContainer, LoggedUserContainer, LogoImg } from './styles';

class Header extends Component {
  render() {
    const loggedUserName = getLoggedUserName() ? getLoggedUserName() : '';
    const loggedUserCompany = getLoggedUserCompanyName()
      ? getLoggedUserCompanyName()
      : '';
    const loggedUserType = getLoggedUserType() ? getLoggedUserType() : 3;
    return (
      <HeaderContainer fluid={true}>
        <StdRow sm={12}>
          <StdCol sm={1}>
            <LogoImg src={Logo} />
          </StdCol>
          <StdCol sm={8}>
            <div>
              <p>eFila - Sistema de Controle de Filas</p>
            </div>
          </StdCol>
          <StdCol sm={3}>
            <LoggedUserContainer id="userIdDiv">
              {loggedUserName !== '' && (
                <p>
                  Usuario: {loggedUserName}
                  {'*'.repeat(3 - loggedUserType)}
                </p>
              )}
              {loggedUserCompany !== '' && <p>Empresa: {loggedUserCompany}</p>}
            </LoggedUserContainer>
          </StdCol>
        </StdRow>
      </HeaderContainer>
    );
  }
}

export default Header;
