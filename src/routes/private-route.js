import React from 'react'
import { Navigate } from 'react-router-dom'

import PropTypes from 'prop-types'

import { Header } from '../components/Header'

function PrivateRoute({ element: Element, ...rest }) {
  const user = localStorage.getItem('devburger:userData')

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <Header />
      <Element {...rest} />
    </>
  )
}

PrivateRoute.propTypes = {
  element: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType])
    .isRequired
}

export default PrivateRoute
