import { products } from "./admin";

const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

export const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('products', products);
    res.render('shop', { 
        pageTitle: 'Shop now!',
        products: products
    });
});

