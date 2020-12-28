import React from 'react'

import Header from './components/Header'
import Products from './components/Products'
import Cart from './components/Cart'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <Products />
      <Cart />
      <ToastContainer />
    </div>
  )
}

export default App
