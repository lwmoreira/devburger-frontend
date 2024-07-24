import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import Logo from '../../assets/novo-logo.svg'
import { Button, ErrorMessage } from '../../components'
import api from '../../services/api'
import {
  Container,
  RegisterImage,
  ContainerItens,
  Label,
  Input,
  SigInLink
} from './styles'

export function Register() {
  // Correção das mensagens de erro e valores mínimos de caracteres
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'), // Mensagem de erro correta para nome obrigatório
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'), // Mensagem de erro correta para email
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve conter no mínimo 6 caracteres'), // Corrigido para 6 caracteres
    confirmPassword: Yup.string()
      .required('A confirmação de senha é obrigatória')
      .oneOf([Yup.ref('password')], 'As senhas devem ser iguais') // Mensagem de erro correta para confirmação de senha
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
      // Envia a requisição para criar um novo usuário
      const { status } = await api.post(
        '/users',
        {
          name: clientData.name,
          email: clientData.email,
          password: clientData.password
        },
        { validateStatus: () => true }
      )

      if (status === 201 || status === 200) {
        toast.success('Usuário cadastrado com sucesso')
      } else if (status === 409) {
        toast.error('Email já cadastrado')
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.error('Falha no sistema! Tente novamente')
    }
  }

  return (
    <Container>
      <RegisterImage src={Logo} alt="register-image" />
      <ContainerItens>
        <h1>Cadastre-se</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label error={errors.name?.message}>Nome</Label>
          <Input
            type="text"
            {...register('name')}
            error={errors.name?.message}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>

          <Label error={errors.email?.message}>Email</Label>
          <Input
            type="text"
            {...register('email')}
            error={errors.email?.message}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label error={errors.password?.message}>Senha</Label>
          <Input
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Label error={errors.confirmPassword?.message}>Confirmar Senha</Label>
          <Input
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

          <Button type="submit" style={{ marginTop: 16, marginBottom: 10 }}>
            Cadastrar
          </Button>
        </form>
        <SigInLink style={{ marginBottom: 10 }}>
          Já possui conta?{' '}
          <Link style={{ color: 'white' }} to="/login">
            Entrar
          </Link>
        </SigInLink>
      </ContainerItens>
    </Container>
  )
}
