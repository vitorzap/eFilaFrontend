import styled from 'styled-components';
import { StdContainer } from '../../styles/main';

export const PageContainer = styled(StdContainer)`
  margin: 0px;
  background-color: #ffffff;
  height: 100%;
  width: 90vw;
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

export const Form = styled.form`
  // border: 1px solid #0000ff;
  width: 100%;
  background: #fff;
  padding-top: 1vh;
  padding-left: 3vh;
  display: flex;
  flex-direction: column;
  align-items: left;
  div {
    display: flex;
    flex-direction: row;
    justify-content: left;
    padding: 0;
    width: 100%;
  }
  label {
    font-size: 16px;
    margin-top: 5px;
    margin-right: 5px;
    text-align: ${props => (props.align ? 'right' : 'left')};
    width: 100%;
  }
  input {
    flex: 1;
    height: 1.5em;
    margin-top: 5px;
    margin-bottom: 15px;
    padding: 2px 2px 2px 2px;
    color: #777;
    text-align: left;
    font-size: 16px;
    width: 100%;
    border: 1px solid #ddd;
  }
  select {
    flex: 1;
    height: 1.5em;
    margin-top: 5px;
    margin-bottom: 15px;
    color: #777;
    padding: 2px 2px 2px 2px;
  }
  button {
    background-color: white;
    color: black;
    border: 1px solid #555555;
    // color: #fffff !important;
    // // background-color: #0e295c;
    // background-color: #555555;
    width: 8em;
    font-size: 14px;
    margin-top: 1em;
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
