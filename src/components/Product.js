import React, { Component } from 'react'

class Product extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 0,
    }
  }

  handleQuantityChange(action) {
    // action should be true or false boolean
    if (action) {
      this.setState({
        quantity: this.state.quantity + 1,
      })
    } else {
      if (this.state.quantity > 0) {
        this.setState({
          quantity: this.state.quantity - 1,
        })
      }
    }
  }

  handleAddToCart() {
    this.props.addToCart(this.props.product.id, this.state.quantity)
    this.setState({
      quantity: 0,
    })
  }

  render() {
    return (
      <div className="product">
        <img alt="product" src={this.props.product.image} />
        <p>{this.props.product.name}</p>
        <p>${this.props.product.price}</p>
        <p>{this.state.quantity}</p>
        <div className="button-hold">
          <button onClick={() => this.handleQuantityChange(false)}>
            Quantity -
          </button>

          <button onClick={() => this.handleQuantityChange(true)}>
            Quantity +
          </button>
        </div>
        {this.state.quantity ? (
          <button onClick={() => this.handleAddToCart()}>Add to Cart</button>
        ) : null}
      </div>
    )
  }
}
export default Product
