import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CartItem from './CartItem'

const Cart = (props) => {
  const [cart, setCart] = useState({ items: [], total: 0 })

  useEffect(() => {
    axios.get('/api/cart').then((res) => {
      setCart(res.data)
    })
  }, [])

  function changeQuantity(id, action) {
    axios.put(`/api/cart/${id}?action=${action}`).then((res) => {
      setCart(res.data)
    })
  }

  function removeFromCart(id) {
    axios.delete(`/api/cart/${id}`).then((res) => {
      setCart(res.data)
    })
  }

  function checkout() {
    axios.delete('/api/cart').then((res) => {
      setCart(res.data)
    })
  }

  const cartMap = cart.items.map((element) => {
    return (
      <CartItem
        key={element.cart_id}
        item={element}
        changeQuantity={changeQuantity}
        removeFromCart={removeFromCart}
      />
    )
  })

  return (
    <div className="cart-container display">
      <div className="cart">
        <h2>Your Cart</h2>
        {cartMap}
      </div>
      <div className="total">
        Your total: ${cart.total}
        <button onClick={() => checkout()}>Checkout</button>
      </div>
    </div>
  )
}
export default Cart
