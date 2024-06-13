import React from 'react'

import HomeImage from '../../assets/ImgHome-codeburger.svg'
import { CategoryCarousel, OffersCarousel } from '../../components'
import { Container, HomeImg } from './styles'

export function Home() {
  return (
    <Container>
      <HomeImg src={HomeImage} alt="Image da home" />
      <CategoryCarousel />
      <OffersCarousel />
    </Container>
  )
}
