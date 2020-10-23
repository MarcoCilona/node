export const products = [];

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/aaadmin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
}

exports.postAddProduct = (req, res, next) => {
    this.products.push({ title: req.body.title });
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    res.render('shop', { 
        pageTitle: 'Shop now!',
        products,
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productsCss: true
    });
}