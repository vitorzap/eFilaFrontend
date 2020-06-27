import styled from 'styled-components';

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
