import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import api from '../../../services/api'
import formatCurrency from '../../../utils/formatCurrency'
import { Container, Img, EditIconStyles } from './styles'

function ListProducts() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data } = await api.get('/products')
        setProducts(data)
      } catch (error) {
        console.error('Falha ao carregar produtos', error)
      }
    }
    loadProducts()
  }, [])

  function isOffer(offerStatus) {
    if (offerStatus) {
      return <CheckCircleIcon style={{ color: '#228822' }} />
    }
    return <CancelIcon style={{ color: '#cc1717' }} />
  }

  const editProduct = product => {
    navigate('/editar-produtos', { state: { product } })
  }

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell align="center">Produto em Oferta</TableCell>
              <TableCell align="center">Imagem do Produto</TableCell>
              <TableCell>Editar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.map(product => (
                <TableRow
                  key={product.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell>{formatCurrency(product.price)}</TableCell>
                  <TableCell align="center">{isOffer(product.offer)}</TableCell>
                  <TableCell align="center">
                    <Img
                      src={`https://devburger-backend-production-8436.up.railway.app/product-file/${product.path}`}
                      alt={`imagem do produto ${product.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <EditIconStyles onClick={() => editProduct(product)} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default ListProducts
