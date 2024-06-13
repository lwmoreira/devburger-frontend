import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import { Home, Login, Products, Register, Cart } from '../containers'
import PrivateRoute from './private-route'

function MyRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/" element={<PrivateRoute element={Home} />} />
        <Route path="/produtos" element={<PrivateRoute element={Products} />} />
        <Route path="/carrinho" element={<PrivateRoute element={Cart} />} />
      </Routes>
    </Router>
  )
}

export default MyRoutes
