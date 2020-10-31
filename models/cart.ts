const cartFs = require('fs');
const cartPath = require('path');
const cartPathUtil = require('../util/path')

const _cartPath = cartPath.join(cartPathUtil, 'data', 'cart.json');

module.exports = class Cart {

    static addProduct({ id, price }) {
        cartFs.readFile(_cartPath, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            
            if (!err) {
                cart = JSON.parse(fileContent);
            }

            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.quantity++;
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, quantity: 1 };
                cart.products.push(updatedProduct);
            }
            cart.totalPrice += +price;
            cartFs.writeFile(_cartPath, JSON.stringify(cart), (err) => {
                console.error(err);
            });

        })
    }
}