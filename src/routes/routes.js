import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import Admin from '../components/Admin'
import { Home, Login, Register, Cart } from '../containers'
import Products from '../containers/Products'
import PrivateRoute from './private-route'

function MyRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route
          path="/"
          element={<PrivateRoute element={Home} isAdmin={false} />}
        />
        <Route path="/produtos" element={<PrivateRoute element={Products} />} />
        <Route path="/carrinho" element={<PrivateRoute element={Cart} />} />
        <Route
          path="/pedidos"
          element={<PrivateRoute element={Admin} isAdmin={true} />}
        />
      </Routes>
    </Router>
  )
}

export default MyRoutes
