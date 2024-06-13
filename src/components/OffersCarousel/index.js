import React, { useEffect, useState } from 'react'
import Carousel from 'react-elastic-carousel'

import Offers from '../../assets/ofertas-img.svg'
import api from '../../services/api'
import formatCurrency from '../../utils/formatCurrency'
import { Container, OffersImg, ContainerItens, Image, Button } from './styles'

export function OffersCarousel() {
  const [offers, setOffers] = useState([])

  useEffect(() => {
    async function loadOffers() {
      const { data } = await api.get('/products')

      const onlyOffers = data
        .filter(products => products.offer)
        .map(products => {
          return { ...products, formatedPrice: formatCurrency(products.price) }
        })

      setOffers(onlyOffers)
    }
    loadOffers()
  }, [])

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 400, itemsToShow: 2 },
    { width: 600, itemsToShow: 3 },
    { width: 900, itemsToShow: 4 },
    { width: 1300, itemsToShow: 5 }
  ]

  return (
    <Container>
      <OffersImg src={Offers} alt="logo da Oferta" />
      <Carousel
        itemsToShow={5}
        style={{ width: '90%' }}
        breakPoints={breakPoints}
      >
        {offers &&
          offers.map(products => (
            <ContainerItens key={products.id}>
              <Image src={products.url} alt="foto da categoria" />
              <p>{products.name}</p>
              <p>{products.formatedPrice}</p>
              <Button>Peça Agora</Button>
            </ContainerItens>
          ))}
      </Carousel>
    </Container>
  )
}
