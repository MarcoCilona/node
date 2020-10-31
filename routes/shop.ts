const shopContoller = require('../controllers/shop')
const express = require('express');

export const router = express.Router();

router.get('/', shopContoller.getIndex);

router.get('/products', shopContoller.getProducts);

router.get('/products/:id', shopContoller.getProduct);

router.get('/cart', shopContoller.getCart);

router.get('/orders', shopContoller.getOrders);

router.get('/checkout', shopContoller.getCheckout);


