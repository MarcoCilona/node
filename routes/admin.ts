const express = require('express');

const productsController = require('../controllers/products');

export const router = express.Router();

router.get('/add-product', productsController.getAddProduct);

router.post('/add-product', productsController.postAddProduct);