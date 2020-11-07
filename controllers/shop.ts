const ShopProduct = require('../models/product');
const ShopCart = require('../models/cart');


exports.getProducts = async (req, res, next) => {
    const products = await ShopProduct.fetchAll();
    res.render('shop/product-list', { 
        pageTitle: 'Shop now!',
        products,
        path: '/products'
    });
   
}

exports.getProduct = async (req, res, next) => {
    const { id } = req.params;

    const product = await ShopProduct.findById(id);
    if (!product) res.redirect('/products');
    res.render('shop/product-detail', { 
        pageTitle: product.title,
        product,
        path: '/product-detail'
    });
}

exports.getIndex = (req, res, next) => {
    // ShopProduct.fetchAll((products) => {
    //     res.render('shop/index', { 
    //         pageTitle: 'Shop now!',
    //         products,
    //         path: '/'
    //     });
    // });
}

exports.getCart = (req, res, next) => {
    ShopCart.getProducts((cart => {
        // ShopProduct.fetchAll(products => {
        //     const cartProducts = [];
        //     for (const product of products) {
        //         const productData = cart.products.find(prod => prod.id === product.id);
        //         if (productData) {
        //             cartProducts.push({
        //                 product,
        //                 quantity: productData.quantity
        //             });
        //         }
        //     }

        //     res.render('shop/cart', {
        //         path: '/cart',
        //         pageTitle: 'Your cart',
        //         products: cartProducts,
        //         total: cart.totalPrice
        //     })
        // })
    }))
}

exports.addToCart = (req, res, next) => {
    const { id } = req.body;
    
    // ShopProduct.findById(+id, product => {
    //     ShopCart.deleteProduct(+id, product.price);
    //     res.redirect('/cart');
    // })
}

exports.postCartDeleteItem = (req, res, next) => {
    const { id } = req.body;

    // ShopProduct.findById(+id, product => {
    //     ShopCart.deleteProduct(+id, product.price)
    //     res.render('shop/cart', {
    //         path: '/cart',
    //         pageTitle: 'Your cart',
    //     })
    // });
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your orders',
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: 'checkout',
        pageTitle: 'Your checkout',
    })
}
