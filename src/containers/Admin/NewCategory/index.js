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
  const [categories, setCategories] = useState([])
  const [isFormVisible, setIsFormVisible] = useState(false)
  const navigate = useNavigate()

  const schema = Yup.object().shape({
    name: Yup.string().required('Digite o nome da categoria'),
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
      }),
    category: Yup.string().notRequired()
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    const categoryDataFormData = new FormData()

    categoryDataFormData.append('name', data.name)
    if (data.category) {
      categoryDataFormData.append('category_id', data.category)
    }
    categoryDataFormData.append('file', data.file[0])

    await toast.promise(api.post('categories', categoryDataFormData), {
      pending: 'Criando nova Categoria...',
      success: 'Categoria criada com sucesso',
      error: 'Ocorreu um erro ao tentar criar a categoria'
    })

    setTimeout(() => {
      navigate('/listar-produtos')
    }, 2000)
  }

  useEffect(() => {
    async function loadCategories() {
      try {
        const { data } = await api.get('/categories')
        setCategories(data)
      } catch (error) {
        toast.error('Erro ao carregar categorias')
      }
    }

    loadCategories()
  }, [])

  return (
    <Container>
      <ButtonStyles onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? 'Fechar Formulário' : 'Criar Nova Categoria'}
      </ButtonStyles>

      {isFormVisible && (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label>Nome</Label>
            <Input type="text" {...register('name')} />
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
          </div>

          <div>
            <Label>Categoria Pai (opcional)</Label>
            <select {...register('category')}>
              <option value="">Selecione uma categoria (opcional)</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <ErrorMessage>{errors.category?.message}</ErrorMessage>
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

          <ButtonStyles type="submit">Criar Categoria</ButtonStyles>
        </form>
      )}
    </Container>
  )
}

export default NewCategory
