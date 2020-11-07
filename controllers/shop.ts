import Product from '../models/product';


exports.getProducts = async (req, res, next) => {
    const products = await Product.fetchAll();
    res.render('shop/product-list', { 
        pageTitle: 'Shop now!',
        products,
        path: '/products'
    });
   
}

exports.getProduct = async (req, res, next) => {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) res.redirect('/products');
    res.render('shop/product-detail', { 
        pageTitle: product.title,
        product,
        path: '/product-detail'
    });
}

exports.getIndex = (req, res, next) => {
    // Product.fetchAll((products) => {
    //     res.render('shop/index', { 
    //         pageTitle: 'Shop now!',
    //         products,
    //         path: '/'
    //     });
    // });
}

exports.getCart = async (req, res, next) => {
    const user = req.user;
    const products = await user.getProducts();

    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your cart',
        products: [],
        total: 2
        }
    )
}

exports.addToCart = async (req, res, next) => {
    const { id } = req.body;
    const user = req.user;
    const product = await Product.findById(id);

    const cart = await user.addToCart(product);

    if (!cart) res.redirect('/products');
    
    res.redirect('/cart');
}
 
exports.postCartDeleteItem = (req, res, next) => {
    const { id } = req.body;

    // Product.findById(+id, product => {
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
