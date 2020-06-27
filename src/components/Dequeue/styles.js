import styled from 'styled-components';

export const ColButton = styled.button`
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

export const Button = styled.button`
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
`;

export const Label = styled.label`
  font-size: 16px;
  margin-top: 0px;
  padding-right: 5px;
  text-align: right;
  width: 100%;
`;

export const P = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-top: 0px;
  text-align: left;
  text-decoration: bold;
  width: 100%;
`;
