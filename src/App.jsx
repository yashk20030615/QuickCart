import React from 'react'
import ProductList from './Screen/ProductList'
import MyNavbar from './Components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Cart from './Screen/Cart'
import ProductDetails from './Screen/ProductDetails'


const App = () => {
  return (
    <>
      <MyNavbar />
      <Routes>
        <Route path='/' element={<Navigate to={'/home'} />} />
        <Route path='/home' element={<ProductList />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product-details/:id' element={<ProductDetails />} />
      </Routes>
    </>
  )
}

export default App