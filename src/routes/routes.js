import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import paths from '../constants/paths'
import { Home, Login, Register, Cart, Admin } from '../containers'
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
        <Route
          path="/produtos"
          element={<PrivateRoute element={Products} isAdmin={false} />}
        />
        <Route
          path="/carrinho"
          element={<PrivateRoute element={Cart} isAdmin={true} />}
        />
        <Route
          path={paths.Order}
          element={<PrivateRoute element={Admin} isAdmin={true} />}
        />
        <Route
          path={paths.Products}
          element={<PrivateRoute element={Admin} isAdmin={true} />}
        />
        <Route
          path={paths.NewProduct}
          element={<PrivateRoute element={Admin} isAdmin={true} />}
        />
        <Route
          path={paths.NewCategory}
          element={<PrivateRoute element={Admin} isAdmin={true} />}
        />
        <Route
          path={paths.EditProduct}
          element={<PrivateRoute element={Admin} isAdmin={true} />}
        />
      </Routes>
    </Router>
  )
}

export default MyRoutes
