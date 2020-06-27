import React, { Component } from 'react';
import { MenuContainer, MenuNav, MenuNavItem } from './styles';
import Nav from 'react-bootstrap/Nav';
import { StdRow, StdCol } from '../../../styles/main';
import { isAuthenticated } from '../../../services/auth';

class Menu extends Component {
  render() {
    return (
      <MenuContainer fluid={true}>
        <StdRow sm={12}>
          <StdCol sm={12}>
            <MenuNav>
              <MenuNavItem>
                <Nav.Link href="/companies" eventKey="/companies">
                  Empresas
                </Nav.Link>
              </MenuNavItem>
              <MenuNavItem>
                <Nav.Link href="/users" eventKey="/users">
                  Usuários
                </Nav.Link>
              </MenuNavItem>
              <MenuNavItem>
                <Nav.Link href="/queuetypes" eventKey="/queuetypes">
                  Tipos de Fila
                </Nav.Link>
              </MenuNavItem>
              <MenuNavItem>
                <Nav.Link href="/queues" eventKey="/queues">
                  Filas
                </Nav.Link>
              </MenuNavItem>
              <MenuNavItem>
                <Nav.Link href="/opqueues" eventKey="/opqueues">
                  Gerenciamento
                </Nav.Link>
              </MenuNavItem>
              <MenuNavItem id="itemLogin">
                <Nav.Link
                  href={isAuthenticated() ? '/Logout' : '/Login'}
                  eventKey="/login"
                >
                  {isAuthenticated() ? 'Sair' : 'Entrar'}
                </Nav.Link>
              </MenuNavItem>
              <MenuNavItem>
                <Nav.Link href="/main" eventKey="/main">
                  About us
                </Nav.Link>
              </MenuNavItem>
              <MenuNavItem>
                <Nav.Link href="/users" eventKey="users">
                  Pricing
                </Nav.Link>
              </MenuNavItem>
              <MenuNavItem>
                <Nav.Link href="/queues" eventKey="/queues">
                  Filas
                </Nav.Link>
              </MenuNavItem>
            </MenuNav>
          </StdCol>
        </StdRow>
      </MenuContainer>
    );
  }
}

export default Menu;
