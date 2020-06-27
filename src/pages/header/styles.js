/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import { StdContainer } from '../../styles/main';

export const HeaderContainer = styled(Container)`
  border-bottom: 1px solid #aaaaaa;
  justify-content: left;
  width: 100%;
  height: 50px;
  padding-top: 0px;
  padding-right: 2px;
  padding-bottom: 0px;
  padding-left: 2px;
  margin: 0px;
  div {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  p {
    font-family: 'Verdana', Times, sans-serif;
    font-style: italic;
    font-size: 3vw;
    color: #0e295c;
    margin-top: 0vw;
    margin-bottom: 0.1vw;
    text-align: left;
  }
`;

export const LoggedUserContainer = styled(StdContainer)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0vh;
  margin-top: 0vh;
  p {
    font-family: 'Verdana', Times, sans-serif;
    font-style: italic;
    font-size: 0.9vw;
    color: #0e295c;
    margin-top: 0.1vw;
    margin-botton: 0.5vw;
    text-align: left;
  }
`;

export const LogoImg = styled.img`
border-radius: 50%;
max-height: 40px;
max-width: 50px;
color: blue;
margin-top: 1%;
margin-left: 30px;
}
`;
