const products = require('../data.json')

const cart = {
  total: 0,
  items: [],
}

let cartId = 0

// @product
/*
  {
    id: number,
    name: string,
    image: string,
    price: number
  }
*/

// @product in cart
/*
  {
    id: number,
    name: string,
    image: string,
    price: number,
    cart_id: number,
    quantity: number
  }
*/

const updateTotal = () => {
  const cartTotal = cart.items.reduce((acc, element) => {
    const itemTotal = element.price * element.quantity
    return acc + itemTotal
  }, 0)

  cart.total = cartTotal
}

module.exports = {
  getCart: (req, res) => {
    res.status(200).send(cart)
  },
  addToCart: (req, res) => {
    const { product_id, quantity } = req.body

    const index = cart.items.findIndex((element) => element.id === +product_id)

    if (index === -1) {
      //What to do if the item is not yet in my cart
      const product = products.find((element) => element.id === +product_id)
      product.cart_id = cartId
      product.quantity = quantity

      cart.items.push(product)

      cartId++
    } else {
      //What to do if the item is already in my cart
      cart.items[index].quantity += quantity
    }

    updateTotal()

    res.status(200).send(cart)
  },
  changeQuantity: (req, res) => {
    const { cart_id } = req.params

    // action should either be 'increase' or 'decrease'
    const { action } = req.query

    const index = cart.items.findIndex(
      (element) => element.cart_id === +cart_id
    )

    if (index === -1) {
      return res.status(404).send('Item not in cart')
    }

    if (action === 'increase') {
      cart.items[index].quantity++
    } else if (action === 'decrease') {
      if (cart.items[index].quantity === 1) {
        cart.items.splice(index, 1)
      } else {
        cart.items[index].quantity--
      }
    } else {
      return res
        .status(400)
        .send(
          `Query ${action} is not supported.  Use either 'increase' or 'decrease'`
        )
    }

    updateTotal()
    res.status(200).send(cart)
  },
  removeFromCart: (req, res) => {
    const { cart_id } = req.params

    const index = cart.items.findIndex(
      (element) => element.cart_id === +cart_id
    )

    if (index === -1) {
      return res.status(404).send('Item not in cart')
    }

    cart.items.splice(index, 1)
    updateTotal()
    res.status(200).send(cart)
  },
  checkout: (req, res) => {
    cart.total = 0
    cart.items = []
    res.status(200).send(cart)
  },
}
