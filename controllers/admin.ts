const AdminProduct = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
}

exports.postAddProduct = (req, res, next) => {
    const product = new AdminProduct({
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        price: req.body.price,
    });
    product.save();
    res.redirect('/products');
}

exports.getProducts = (req, res, next) => {
    AdminProduct.fetchAll((products) => {
        res.render('admin/products', { 
            pageTitle: 'Shop now!',
            products,
            path: '/admin/products'
        });
    });
}