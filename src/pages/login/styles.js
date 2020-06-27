import styled from 'styled-components';
import { StdRow } from '../../styles/main';

export const LoginRow = styled(StdRow)`
  margin-top: 20vh;
  border: 1px solild #ff0000;
`;

export const Form = styled.form`
  border-top: 1px solid #dddddd;
  border-left: 1px solid #dddddd;
  border-bottom: 2px solid #cccccc;
  border-right: 2px solid #cccccc;
  width: 25vw;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 100vh;
    margin: 1vw 3vh;
  }
  p {
    font-size: 1vw;
    color: #0e295c;
    // margin-top: 2vh;
    text-align: center;
  }
  input {
    flex: 1;
    height: 20vw;
    margin-bottom: 2vw;
    padding: 0.5vh 1vw;
    color: #777;
    font-size: 1vw;
    width: 100%;
    border: 1px solid #ddd;
    &::placeholder {
      color: #999;
    }
  }
`;

export const BtnSubmit = styled.button`
  color: #fff;
  font-size: 2vh;
  background: #fc6963;
  height: 5vh;
  border: 0;
  border-radius: 5px;
  width: 100%;
`;

export const LoginTitle = styled.span`
  display: flex;
  align-items: center;
  img {
    border-radius: 50%;
    max-width: 50px;
    color: blue;
  }
`;
