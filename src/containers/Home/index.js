import React from 'react'

import HomeImage from '../../assets/ImgHome-codeburger.svg'
import CategoryCarousel from '../../components/CategoryCarousel'
import OffersCarousel from '../../components/OffersCarousel'
import { Container, HomeImg } from './styles'

function Home() {
  return (
    <Container>
      <HomeImg src={HomeImage} alt="Image da home" />
      <CategoryCarousel />
      <OffersCarousel />
    </Container>
  )
}

export default Home
