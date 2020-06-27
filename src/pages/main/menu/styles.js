/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { Nav, NavItem } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

export const MenuContainer = styled(Container)`
  border-right: 1px solid #aaaaaa;
  flex-direction: row;
  justify-content: center;
  width: 10vw;
  height: 91vh;
  padding-top: 2px;
  padding-right: 2px;
  padding-bottom: 2px;
  padding-left: 2px;
  margin-top: 0px;
  margin: 0px;
`;

export const MenuNav = styled(Nav)`
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 0px !important;
  padding-top: 0px !important;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  width: 10vw;
  height: 22vh;
  white-space: nowrap;
  fill: true;
  color: black;
`;

export const MenuNavItem = styled(NavItem)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  height: 4vh;
  margin-bottom: 0vh;
  a {
    margin-top: 1vh;
    padding-top: 0px;
    font-size: 1vw;
    color: #555555;
    text-decoration: none;
    transition: color 0.3s linear;
  }
`;
