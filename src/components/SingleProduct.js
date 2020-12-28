import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const SingleProduct = (props) => {
  const [product, setProduct] = useState({})

  useEffect(() => {
    axios
      .get(`/api/products/${props.match.params.product_id}`)
      .then((res) => {
        setProduct(res.data)
      })
      .catch((err) => {
        props.history.push('/')
      })
  }, [props.match.params.product_id])

  function addToCart() {
    axios
      .post('/api/cart', {
        product_id: product.id,
        quantity: 1,
      })
      .then((res) => {
        toast.success(`Added ${product.name} to cart`)
      })
  }

  return (
    <div className="display cart">
      <h1>{product.name}</h1>
      <img src={product.image} style={{ height: '150px' }} />
      <h2>${product.price}</h2>
      <button onClick={addToCart}>Add To Cart</button>
    </div>
  )
}
export default SingleProduct
