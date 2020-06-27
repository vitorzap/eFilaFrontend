import styled from 'styled-components';
import Container from 'react-bootstrap/Container';

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

export const Form = styled.form`
  // border: 1px solid #0000ff;
  width: 100%;
  background: #fff;
  padding-top: 1vh;
  padding-left: 3vh;
  display: flex;
  flex-direction: column;
  align-items: left;
  label {
    font-size: 16px;
    margin-top: 5px;
    margin-right: 5px;
    text-align: right;
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

export const FieldContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 0.2vh solid #eee;
  border: 3px solid #0000ff;
  // justify-content: left;
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
`;
