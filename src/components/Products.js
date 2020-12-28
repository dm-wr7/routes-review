import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Product from './Product'
import { toast } from 'react-toastify'

const Products = (props) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('/api/products').then((res) => setProducts(res.data))
  }, [])

  function addToCart(id, quantity) {
    const body = { product_id: id, quantity }

    axios.post('/api/cart', body).then((res) => {
      toast.success('Added to cart', { autoClose: 2000 })
    })
  }

  const productMap = products.map((element) => {
    return <Product addToCart={addToCart} key={element.id} product={element} />
  })

  return <div className="products display">{productMap}</div>
}
export default Products
