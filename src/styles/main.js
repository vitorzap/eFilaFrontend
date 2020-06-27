/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const MainContainer = styled(Container)`
  border-right: 0.2vh solid #eee;
  // border: 3px solid #0000ff;
  // justify-content: left;
  width: 100%;
  height: 97vh;
  padding: 0px;
  margin: 0px;
`;

export const StdContainer = styled(Container)`
  border-right: 0.2vh solid #eee;
  justify-content: left;
  width: 100vw;
  height: 100vh;
  padding-top: 2px;
  padding-right: 2px;
  padding-bottom: 2px;
  padding-left: 2px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-right: 0px;
  margin-left: 0px;
`;

export const StdRow = styled(Row)`
  justify-content: left;
  width: 100%;
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-right: 0px;
  margin-left: 0px;
  // border: 1px solid #00ff00;
`;

export const StdCol = styled(Col)`
  // border: 1px solid #ff0000;
  justify-content: left;
  width: 100%;
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-right: 0px;
  margin-left: 0px;
`;
