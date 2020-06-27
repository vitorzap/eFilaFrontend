/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { StdContainer, StdRow, StdCol } from '../../../styles/main';

export const PageContainer = styled(StdContainer)`
  margin: 0px;
  background-color: #ffffff;
  height: 100%;
  width: 90vw;
`;

export const QueueContainer = styled(StdContainer)`
  margin: 0px;
  background-color: ${props =>
    props.colnumber % 2 === 0 ? '#000099' : '#0000ff'};
  height: 40px;
  width: 100%;
  label {
    padding-top: 5px;
    padding-left: 5px;
    text-align: center;
    font-size: 15px;
    color: #ffffff;
    font-weight: bold;
    text-decoration: underline;
  }
  p {
    padding-top: 0px;
    padding-bottom: 0x;
    text-align: center;
    font-size: 13px;
    color: #ffffff;
    font-weight: bold;
  }
`;

export const UsedPosContainer = styled(StdContainer)`
  margin-top: 1px;
  background-color: ${props =>
    props.colnumber % 2 === 0 ? '#990000' : '#ff0000'};
  height: 40px;
  width: 100%;
  label {
    padding-top: 5px;
    padding-left: 5px;
    text-align: center;
    font-size: 15px;
    color: ${props => (props.colnumber % 2 === 0 ? '#ffffff' : '#000000')};
    font-weight: bold;
    text-decoration: underline;
  }
  p {
    padding-top: 0px;
    padding-bottom: 0x;
    text-align: center;
    font-size: 13px;
    color: ${props => (props.colnumber % 2 === 0 ? '#ffffff' : '#000000')};
    font-weight: bold;
  }
`;

export const NumberPosContainer = styled(StdContainer)`
  display: flex;
  flex-direction: right;
  justify-content: right;
  margin-top: 1px;
  height: 40px;
  width: 100%;
  p {
    padding-top: 5px;
    padding-bottom: 0px;
    padding-left: 0px;
    text-align: center;
    font-size: 12px;
    color: #000000;
    font-weight: bold;
  }
`;

export const ButtonPosContainer = styled(StdContainer)`
  display: flex;
  flex-direction: center;
  justify-content: center;
  height: 20px;
  width: 100%;
`;

export const ColButton = styled.button`
   {
    background-color: white;
    color: black;
    border: 1px solid #555555;
    height: 100%;
    width: 80%;
    font-size: 12px;
    font-weight: bold;
    font-color: #000066;
    border-radius: 8px;
    outline: none;
    &:hover {
      background-color: #dddddd;
      outline: none;
    }
    &:active {
      outline: none;
    }
  }
  a {
    font-size: 16;
    font-weight: bold;
    color: #999;
    text-decoration: none;
    &:hover {
      color: #000000;
      outline: none;
    }
    &:active {
      outline: none;
    }
  }
`;

export const PageHeader = styled.span`
  display: flex;
  flex-direction: center;
  justify-content: left;
  margin-bottom: 2px;
  width: 100%;
  height: 5vh;
  p {
    padding-top: 0px;
    padding-bottom: 0x;
    text-align: center;
    font-size: 2rem;
    color: #0e295c;
    font-weight: bold;
  }
`;

export const HeaderButton = styled.button`
   {
    background-color: white;
    color: black;
    border: 1px solid #555555;
    width: 8em;
    font-size: 14px;
    margin-top: 0.5em;
    margin-bottom: 0.2em;
    padding: 0.3em 0.5em 0.3em 0.5em;
    border-radius: 8px;
    outline: none;
    &:hover {
      background-color: #dddddd;
      outline: none;
    }
    &:active {
      outline: none;
    }
  }
  a {
    font-size: 16;
    font-weight: bold;
    color: #999;
    text-decoration: none;
    &:hover {
      color: #000000;
      outline: none;
    }
  }
`;

export const TitRow = styled(StdRow)`
  border-top: 1px solid #555555;
  border-bottom: 1px solid #555555;
  border-right: 1px solid #bbbbbb;
`;

export const TitCol = styled(StdCol)`
  background-color: #aaaaaa;
  padding: 0px;
  border-left: 1px solid #bbbbbb;
  height: 1.4rem;
  p {
    padding-top: 0px;
    padding-bottom: 0x;
    padding-left: 0.1vw;
    text-align: left;
    font-size: 0.9rem;
    color: #ffffff;
    font-weight: bold;
  }
  button {
    background-color: #aaaaaa;
    color: #ffffff;
    font-weight: bold;
    border: 0px;
  }
`;

export const TableRow = styled(StdRow)`
  border-bottom: 1px solid #bbbbbb;
  border-right: 1px solid #bbbbbb;
`;

export const TableCol = styled(StdCol)`
  padding-top: 0px;
  padding-bottom: 0x;
  border-left: 1px solid #bbbbbb;
  height: 1.4rem;
  background-color: ${props =>
    (props.rownumber + 1) % 2 === 0 ? '#eeeeee' : '#ffffff'};
  color: '#0e295c';
  p {
    padding-top: 0px;
    padding-bottom: 0x;
    padding-left: 0.1vw;
    text-align: left;
    font-size: 0.9rem;
  }
`;

export const PagerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 0.8vh;
  width: 100%;
  p {
    cursor: pointer;
    color: #0e295c;
    float: left;
    padding: 1px 1px;
    font-size: 0.8em;
  }
`;

export const PosButton = styled.button`
    background-color: ${props =>
      props.colnumber % 2 === 0 ? '#dddddd' : '#ffffff'};
    color: black;
    border: 1px solid #555555;
    height: 100%;
    width: 100%;
    font-size: 12px;
    font-weight: bold;
    font-color: #000066;
    border-radius: 8px;
    outline: none;
    &:hover {
      background-color: #dddddd;
      outline: none;
    }
    &:active {
      outline: none;
    }
  }
  a {
    font-size: 10px;
    font-weight: bold;
    color: #999;
    text-decoration: none;
    &:hover {
      color: #000000;
      outline: none;
    }
    &:active {
      outline: none;
    }
  }
`;
