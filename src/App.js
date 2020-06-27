import React from 'react';
import Routes from './routes';
import { GlobalStyle } from './styles/global';

import { MainContainer, StdRow, StdCol } from './styles/main';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import Header from './pages/header';

const App = () => (
  <MainContainer fluid={true}>
    <GlobalStyle />
    <StdRow sm={12}>
      <StdCol sm={12}>
        <Header />
      </StdCol>
    </StdRow>
    <StdRow>
      <StdCol sm={12}>
        <Routes />{' '}
      </StdCol>
    </StdRow>
  </MainContainer>
);

export default App;
