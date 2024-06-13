import React from 'react'

import CartImage from '../../assets/cart-image.svg'
import { CartItens, CartResume } from '../../components'
import { Container, CartImg, Wrapper } from './styles'

export function Cart() {
  return (
    <Container>
      <CartImg src={CartImage} alt="Imagem da carrinho" />
      <Wrapper>
        <CartItens />
        <CartResume />
      </Wrapper>
    </Container>
  )
}
