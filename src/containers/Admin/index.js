import React from 'react'

import { SideMenuAdmin } from '../../components'
import ListProducts from './ListProducts'
import Orders from './Orders'
import { Container, ContainerItems } from './styles'

export function Admin(props) {
  console.log(props)
  return (
    <Container>
      <SideMenuAdmin />
      <ContainerItems>
        {/* <Orders /> */}
        <ListProducts />
      </ContainerItems>
    </Container>
  )
}
