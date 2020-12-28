const express = require('express')
const productCtrl = require('./controllers/productsController')
const cartCtrl = require('./controllers/cartController')

const app = express()
const SERVER_PORT = 5000

app.use(express.json())

// Product endpoints
app.get('/api/products', productCtrl.getAllProducts)
app.get('/api/products/:product_id', productCtrl.getProductById)

// Cart endpoints
app.get('/api/cart', cartCtrl.getCart)
app.post('/api/cart', cartCtrl.addToCart)
app.put('/api/cart/:cart_id', cartCtrl.changeQuantity)
app.delete('/api/cart/:cart_id', cartCtrl.removeFromCart)
app.delete('/api/cart', cartCtrl.checkout)

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))
