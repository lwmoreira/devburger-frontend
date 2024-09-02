import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import LoginImg from '../../assets/img-login-codeburger.svg'
import Logo from '../../assets/logo-codeburger.svg'
import { Button, ErrorMessage } from '../../components'
import { useUser } from '../../hooks/UserContext'
import api from '../../services/api'
import {
  Container,
  LoginImage,
  ContainerItens,
  Label,
  Input,
  SigInLink
} from './styles'

export function Login() {
  const navigate = useNavigate()
  const { putUserData } = useUser()

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
    try {
      const { data } = await api.post('session', {
        email: clientData.email,
        password: clientData.password
      })

      putUserData(data)

      toast.success('Seja bem vindo(a)')

      setTimeout(() => {
        if (data.admin) {
          navigate('/pedidos')
        } else navigate('/login')
      }, 1000)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Email ou senha incorretos')
      } else {
        toast.error('Falha no sistema! Tente novamente')
      }
    }
  }

  return (
    <Container>
      <LoginImage src={LoginImg} alt="Login-image" />
      <ContainerItens>
        <img src={Logo} alt="logo-codeburger" />
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
          Não possui conta?{' '}
          <Link style={{ color: 'white' }} to="/cadastro">
            Cadastrar
          </Link>
        </SigInLink>
      </ContainerItens>
    </Container>
  )
}
