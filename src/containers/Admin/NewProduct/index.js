import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import ReactSelect from 'react-select'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import * as Yup from 'yup'

import { ErrorMessage } from '../../../components'
import api from '../../../services/api'
import { Container, Label, Input, ButtonStyles, LabelUpload } from './styles'

function NewProduct() {
  const [fileName, setFileName] = useState(null)
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  // Definindo o esquema de validação
  const schema = Yup.object().shape({
    name: Yup.string().required('Digite o nome do produto'),
    price: Yup.number()
      .required('Digite o valor do produto')
      .typeError('Digite um valor numérico'),
    category: Yup.object().required('Escolha uma categoria'),
    file: Yup.mixed()
      .required('Carregue um arquivo') // Adicionando `required` para garantir que o arquivo seja enviado
      .test('type', 'Tipos de arquivos válidos JPEG, PNG ou SVG', value => {
        return (
          value[0]?.type === 'image/jpeg' ||
          value[0]?.type === 'image/png' ||
          value[0]?.type === 'image/svg+xml'
        )
      })
      .test('fileSize', 'Carregue o arquivo até 2mb', value => {
        return value && value[0]?.size <= 200000
      })
  })

  // Configurando o formulário com react-hook-form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  // Função para lidar com o envio do formulário
  const onSubmit = async data => {
    const productDataFormData = new FormData()

    // Adicionando dados ao FormData
    productDataFormData.append('name', data.name)
    productDataFormData.append('price', data.price)
    productDataFormData.append('category_id', data.category.id) // Corrigido para `category_id`
    productDataFormData.append('file', data.file[0])
    console.log(productDataFormData)
    // Enviando os dados para o backend e lidando com mensagens de sucesso e erro
    await toast.promise(api.post('products', productDataFormData), {
      pending: 'Criando novo produto...',
      success: {
        render: 'Produto criado com sucesso',
        style: {
          backgroundColor: 'green',
          color: 'white'
        }
      },
      error: {
        render: 'Ocorreu um erro ao tentar criar o produto',
        style: {
          backgroundColor: 'red',
          color: 'white'
        }
      }
    })

    setTimeout(() => {
      navigate('/listar-produtos') // Redirecionando após o sucesso
    }, 1000)
  }

  // Carregando categorias do backend
  useEffect(() => {
    async function loadCategories() {
      try {
        const { data } = await api.get('/categories')
        setCategories(data)
      } catch (error) {
        console.error('Failed to load categories', error) // Adicionando tratamento de erro
      }
    }

    loadCategories()
  }, [])

  return (
    <Container>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Nome</Label>
          <Input type="text" {...register('name')} />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>
        <div>
          <Label>Preço</Label>
          <Input type="number" {...register('price')} />
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
        </div>
        <div>
          <LabelUpload>
            {fileName || (
              <>
                <UploadFileIcon />
                Carregar Imagem
              </>
            )}

            <input
              type="file"
              accept="image/png, image/jpeg, image/svg+xml" // Corrigido para incluir `image/jpeg`
              {...register('file')}
              onChange={value => {
                setFileName(value.target.files[0]?.name)
              }}
            />
          </LabelUpload>
          <ErrorMessage>{errors.file?.message}</ErrorMessage>
        </div>
        <div>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <ReactSelect
                {...field}
                options={categories}
                getOptionLabel={cat => cat.name}
                getOptionValue={cat => cat.id}
                placeholder="Categorias"
              />
            )}
          />
          <ErrorMessage>{errors.category?.message}</ErrorMessage>
        </div>
        <ButtonStyles type="submit">Adicionar Produto</ButtonStyles>{' '}
        {/* Corrigido para "Adicionar Produto" */}
      </form>
    </Container>
  )
}

export default NewProduct
