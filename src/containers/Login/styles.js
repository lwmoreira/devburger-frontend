import styled from 'styled-components'

import Background from '../../assets/backeground-tela-login-codeburger.svg'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: url('${Background}');
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoginImage = styled.img`
  height: 70%;
`

export const ContainerItens = styled.div`
  border-radius: 0 10px 10px 0;
  background: #373737de;
  height: 70%;
  padding: 25px 75px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: #fff;
    font-family: Roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 28px;
    text-align: center;
    margin-top: 24px;
  }

  form {
    display: flex;
    flex-direction: column;
  }
  img {
    margin-bottom: 17px;
  }
`
export const Label = styled.p`
  color: #fff;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  margin-top: 15px;
  margin-bottom: 5px;
`

export const Input = styled.input`
  border-radius: 5px;
  background: #fff;
  width: 285px;
  height: 36px;
  border: ${props => (props.error ? '2px solid #CC1717' : 'none')};
  box-shadow: 3px 3px 10px 0px rgba(74, 144, 226, 0.19);
  padding-left: 10px;
`
export const SigInLink = styled.p`
  color: #fff;

  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 350;
  line-height: normal;
  margin-top: 15px;

  a {
    &:hover {
      opacity: 0.8;
    }

    &:active {
      opacity: 0.5;
    }
    cursor: pointer;
    text-decoration: underline;
  }
`
