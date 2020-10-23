const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', { 
            pageTitle: 'Shop now!',
            products,
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productsCss: true
        });
    });
    
}