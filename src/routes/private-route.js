import React from 'react'
import { Navigate } from 'react-router-dom'

import PropTypes from 'prop-types'

import { Header } from '../components/Header'

function PrivateRoute({ element: Element, isAdmin, ...rest }) {
  const user = localStorage.getItem('devburger:userData')

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      {!isAdmin && <Header />}
      <Element {...rest} />
    </>
  )
}

PrivateRoute.propTypes = {
  element: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType])
    .isRequired,
  isAdmin: PropTypes.bool.isRequired
}

export default PrivateRoute
