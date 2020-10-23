const productsController = require('../controllers/products')
const express = require('express');

export const router = express.Router();

router.get('/', productsController.getProducts);

