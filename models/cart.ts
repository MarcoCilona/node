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

    static deleteProduct(id, price) {
        cartFs.readFile(_cartPath, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            const updatedCart = { ...cart };
            const productIndex = updatedCart.products.findIndex(prod => prod.id === +id);

            if (err || productIndex === -1) return;
            
            const { quantity } = updatedCart.products[productIndex];
            updatedCart.totalPrice -= (price * quantity);
            updatedCart.products.splice(productIndex, 1);

            cartFs.writeFile(_cartPath, JSON.stringify(updatedCart), (err) => {
                console.error(err);
            });

        })
    }

    static getProducts(cb) {
        cartFs.readFile(_cartPath, (err, fileContent) => {
            if (err) {
                return cb(null)
            }
            
            const cart = JSON.parse(fileContent);
            cb(cart);
        });
    }
}