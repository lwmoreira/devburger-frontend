import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import * as Yup from 'yup'

import { ErrorMessage } from '../../../components'
import api from '../../../services/api'
import { Container, Label, Input, ButtonStyles, LabelUpload } from './styles'

function NewCategory() {
  const [fileName, setFileName] = useState(null)
  const [setCategories] = useState([])
  const navigate = useNavigate()

  const schema = Yup.object().shape({
    name: Yup.string().required('Digite o nome do produto'),

    file: Yup.mixed()
      .test('required', 'Carregue um arquivo', value => {
        return value?.length > 0
      })
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

  const {
    register,
    handleSubmit,

    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    const productDataFormData = new FormData()

    productDataFormData.append('name', data.name)
    productDataFormData.append('category_id', data.category.id)
    productDataFormData.append('file', data.file[0])

    await toast.promise(api.post('products', productDataFormData), {
      pending: 'Criando nova Categoria...',
      success: {
        render: 'Categoria criada com sucesso',
        style: {
          backgroundColor: 'green',
          color: 'white'
        }
      },
      error: {
        render: 'Ocorreu um erro ao tentar criar a categoria',
        style: {
          backgroundColor: 'red',
          color: 'white'
        }
      }
    })

    setTimeout(() => {
      navigate('/listar-produtos')
    }, 1000)
  }
  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('/categories')

      setCategories(data)
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
          <LabelUpload>
            {fileName || (
              <>
                <UploadFileIcon />
                Carregar Imagem
              </>
            )}

            <input
              type="file"
              accept="image/png, image/jpg, image/svg"
              {...register('file')}
              onChange={value => {
                setFileName(value.target.files[0]?.name)
              }}
            />
          </LabelUpload>
          <ErrorMessage>{errors.file?.message}</ErrorMessage>
        </div>
        <div>
          <ErrorMessage>{errors.category?.message}</ErrorMessage>
        </div>

        <ButtonStyles type="submit">Criar Categoria</ButtonStyles>
      </form>
    </Container>
  )
}

export default NewCategory
