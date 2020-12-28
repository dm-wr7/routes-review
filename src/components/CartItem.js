import React from 'react'

const CartItem = (props) => {
  return (
    <div className="cart-item">
      <img alt="product" src={props.item.image} />
      <div>
        <p>{props.item.name}</p>
        <p>{props.item.quantity}</p>
        <div className="button-hold">
          <button
            onClick={() => props.changeQuantity(props.item.cart_id, 'decrease')}
          >
            -
          </button>
          <button onClick={() => props.removeFromCart(props.item.cart_id)}>
            Remove
          </button>
          <button
            onClick={() => props.changeQuantity(props.item.cart_id, 'increase')}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
export default CartItem
