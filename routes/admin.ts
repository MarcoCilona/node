const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

export const products = [];
export const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
    this.products.push({ title: req.body.title });
    res.redirect('/');
});