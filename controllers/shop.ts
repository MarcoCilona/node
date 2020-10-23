const ShopProduct = require('../models/product');


exports.getProducts = (req, res, next) => {
    ShopProduct.fetchAll((products) => {
        res.render('shop/product-list', { 
            pageTitle: 'Shop now!',
            products,
            path: '/products'
        });
    });
}

exports.getIndex = (req, res, next) => {
    ShopProduct.fetchAll((products) => {
        res.render('shop/index', { 
            pageTitle: 'Shop now!',
            products,
            path: '/'
        });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: 'cart',
        pageTitle: 'Your cart',
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: 'checkout',
        pageTitle: 'Your checkout',
    })
}
