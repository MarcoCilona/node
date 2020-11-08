import Product from '../models/product';

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    })
}

exports.getEditProduct = async (req, res, next) => {
    const { id } = req.params;
    const { edit } = req.query;

    if (edit !== 'true') {
        return res.redirect('/');
    }

    const product = await Product.findById(id);
    if (!product) return res.redirect('/');

    res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: edit === 'true',
        product
    });
}

exports.postEditProduct = async (req, res, next) => {
    const { id, title, imageUrl, price, description } = req.body;
    const product = new Product({
        id,
        title,
        imageUrl,
        description,
        price,
    });
    product.save();
    res.redirect('/admin/products');
}

exports.postDeleteProduct = async (req, res, next) => {
    const { id } = req.body;
    const product = await Product.findById(id);
    
    await Product.deleteById(id);
    await req.user.deleteFromCart(product);
    
    res.redirect('/admin/products');
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product({
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        price: req.body.price,
        userId: req.user._id
    });
    product.save().then((result) => {
        res.redirect('/products');
    });
}

exports.getProducts = async (req, res, next) => {
    const products = await Product.fetchAll();
    res.render('admin/products', { 
        pageTitle: 'Shop now!',
        products,
        path: '/admin/products'
    });
}