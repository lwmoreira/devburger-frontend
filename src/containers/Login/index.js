import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

// eslint-disable-next-line import-helpers/order-imports
import Logo from '../../assets/novo-logo.svg'
import Button from '../../components/Button'
import api from '../../services/api'
import {
  Container,
  LoginImage,
  ContainerItens,
  Label,
  Input,
  SigInLink,
  ErrorMessage
} from './style'

function Login() {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Email inválido')
      .required('Informe um email válido'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve conter no mínimo 6 caractéres')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async clientData => {
    const response = await toast.promise(
      api.post('session', {
        email: clientData.email,
        password: clientData.password
      }),

      {
        pending: 'Verificando seus dados',
        success: 'Seja bem vindo(a)',
        error: 'Verifique seu email e senha'
      }
    )

    console.log(response)
  }

  return (
    <Container>
      <LoginImage src={Logo} alt="login-image" />
      <ContainerItens>
        <h1>Login</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label>Email</Label>
          <Input
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label>Senha</Label>
          <Input
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Button type="submit" style={{ marginTop: 16 }}>
            Entrar
          </Button>
        </form>

        <SigInLink>
          Não possui conta? <a> Cadastrar</a>
        </SigInLink>
      </ContainerItens>
    </Container>
  )
}

export default Login
