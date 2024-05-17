import React from 'react'

import HomeImage from '../../assets/header-home-img.svg'
import CategoryCarousel from '../../components/CategoryCarousel'
import { Container, HomeImg } from './styles'

function Home() {
  return (
    <Container>
      <HomeImg src={HomeImage} alt="Image da home" />
      <CategoryCarousel />
    </Container>
  )
}

export default Home
