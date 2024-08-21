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

  const schema = Yup.object().shape({
    name: Yup.string().required('Digite o nome do produto'),
    price: Yup.number()
      .required('Digite o valor do produto')
      .typeError('Digite um valor numérico'),
    category: Yup.object().required('Escolha uma categoria'),
    file: Yup.mixed()
      .required('Carregue um arquivo')
      .test(
        'type',
        'Tipos de arquivos válidos JPG, JPEG, PNG ou SVG',
        value => {
          return (
            value[0]?.type === 'image/jpeg' ||
            value[0]?.type === 'image/jpg' ||
            value[0]?.type === 'image/png' ||
            value[0]?.type === 'image/svg'
          )
        }
      )
      .test('fileSize', 'Carregue o arquivo até 2mb', value => {
        return value && value[0]?.size <= 2000000
      })
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    const productDataFormData = new FormData()

    productDataFormData.append('name', data.name)
    productDataFormData.append('price', data.price)
    productDataFormData.append('category_id', data.category.id)
    productDataFormData.append('file', data.file[0])
    productDataFormData.append('offer', false)

    try {
      await toast.promise(
        api.post('products', productDataFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }),
        {
          pending: 'Criando novo produto...',
          success: 'Produto criado com sucesso',
          error: 'Ocorreu um erro ao tentar criar o produto'
        }
      )

      setTimeout(() => {
        navigate('/listar-produtos')
      }, 1000)
    } catch (error) {
      console.error('Erro ao criar produto:', error)
    }
  }

  useEffect(() => {
    async function loadCategories() {
      try {
        const { data } = await api.get('/categories')
        setCategories(data)
      } catch (error) {
        console.error('Failed to load categories', error)
        toast.error('Erro ao carregar categorias')
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
              accept="image/png, image/jpeg, image/jpg, image/svg"
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
                placeholder="Escolha a categoria"
              />
            )}
          />
          <ErrorMessage>{errors.category?.message}</ErrorMessage>
        </div>
        <ButtonStyles type="submit">Adicionar Produto</ButtonStyles>
      </form>
    </Container>
  )
}

export default NewProduct
