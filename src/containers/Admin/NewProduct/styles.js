import styled from 'styled-components'

import { Button } from '../../../components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    background: #565656;
    border-radius: 10px;
    padding: 30px;
  }
`

export const Label = styled.p`
  font-size: 14px;
  color: #ffffff;
  margin-bottom: 3px;
`

export const Input = styled.input`
  height: 45px;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 4px 14px 0px #0000001a;
  border-radius: 8px;
  border: none;
  margin-bottom: 20px;
  min-width: 280px;
`
export const ButtonStyles = styled(Button)`
  width: 100%;
  margin-top: 20px;
`
export const LabelUpload = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px dashed #ffffff;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  gap: 30px;

  input {
    opacity: 0;
    width: 1px;
  }
`
