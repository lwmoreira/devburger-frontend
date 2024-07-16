import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import ReactSelect from 'react-select'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import * as Yup from 'yup'

import { ErrorMessage } from '../../../components'
import api from '../../../services/api'
import {
  Container,
  Label,
  Input,
  ButtonStyles,
  LabelUpload,
  ContainerInput
} from './styles'

function EditProduct() {
  const [fileName, setFileName] = useState(null)
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()
  // const location = useLocation() -> ostimizado pela linha22

  // const product = location.state?.product -> pode ser desestruturado pela linha 22
  const { state: { product } = {} } = useLocation() // Recebe o produto da localização

  console.log(product)

  // Validação do formulário usando Yup
  const schema = Yup.object().shape({
    name: Yup.string().required('Digite o nome do produto'),
    price: Yup.number().typeError('Digite o valor do produto'),
    category: Yup.object().required('Escolha uma categoria'),
    offer: Yup.bool()
  })

  // Configuração do useForm para gerenciar o estado do formulário
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  // Função chamada ao enviar o formulário
  const onSubmit = async data => {
    const productDataFormData = new FormData()

    productDataFormData.append('name', data.name)
    productDataFormData.append('price', data.price)
    productDataFormData.append('category_id', data.category.id)
    productDataFormData.append('file', data.file[0])
    productDataFormData.append('offer', data.offer)

    await toast.promise(
      api.put(`products/${product.id}`, productDataFormData),
      {
        pending: 'Editando novo produto...',
        success: {
          render: 'Produto editado com sucesso',
          style: {
            backgroundColor: 'green',
            color: 'white'
          }
        },
        error: {
          render: 'Ocorreu um erro ao tentar editar o produto',
          style: {
            backgroundColor: 'red',
            color: 'white'
          }
        }
      }
    )

    setTimeout(() => {
      navigate('/listar-produtos')
    }, 1000)
  }

  // Carrega as categorias disponíveis ao montar o componente
  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('/categories')
      setCategories(data)
    }

    loadCategories()
  }, [])
  // Se houver um produto, preenche os campos do formulário com seus dados
  //   if (product) {
  //     setValue('name', product.name)
  //     setValue('price', product.price)
  //     setValue('category', product.category)
  //     setFileName(product.fileName) // Aqui deve ser setFileName(product.url) se a URL da imagem for armazenada no produto
  //   }
  // }, [product, setValue])

  return (
    <Container>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Nome</Label>
          <Input
            type="text"
            {...register('name')}
            defaultValue={product.name}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>

        <div>
          <Label>Preço</Label>
          <Input
            type="number"
            {...register('price')}
            defaultValue={product.price}
          />
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
          <Controller
            name="category"
            control={control}
            defaultValue={product.category}
            render={({ field }) => (
              <ReactSelect
                {...field}
                options={categories}
                getOptionLabel={cat => cat.name}
                getOptionValue={cat => cat.id}
                placeholder="Categorias"
                defaultValue={product.category}
              />
            )}
          />
          <ErrorMessage>{errors.category?.message}</ErrorMessage>
        </div>
        <ContainerInput>
          <input
            type="checkbox"
            {...register('offer')}
            defaultChecked={product.offer}
          />
          <Label>Produto em oferta?</Label>
        </ContainerInput>
        <ButtonStyles type="submit">Editar Produto</ButtonStyles>
      </form>
    </Container>
  )
}

export default EditProduct
