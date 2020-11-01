const AdminProduct = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    })
}

exports.getEditProduct = (req, res, next) => {
    const { id } = req.params;
    const { edit } = req.query;

    if (edit !== 'true') {
        return res.redirect('/');
    }

    AdminProduct.findById(+id, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: edit === 'true',
            product
        })
    });

}

exports.postEditProduct = (req, res, next) => {
    const { id, title, imageUrl, price, description } = req.body;
    const product = new AdminProduct({
        id,
        title,
        imageUrl,
        description,
        price,
    });
    product.save();
    res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next) => {
    const { id } = req.body;
    AdminProduct.deleteById(id)
    res.redirect('/admin/products');
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