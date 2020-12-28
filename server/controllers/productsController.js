const products = require('../data.json')

// @product
/*
  {
    id: number,
    name: string,
    image: string,
    price: number
  }
*/

module.exports = {
  getAllProducts: (req, res) => {
    res.status(200).send(products)
  },
  getProductById: (req, res) => {
    const product = products.find((e) => e.id === +req.params.product_id)

    if (product) {
      res.status(200).send(product)
    } else {
      res.status(404).send('Product not found')
    }
  },
}
