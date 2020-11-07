const mongodb = require('mongodb');
import database from '../util/database';
import Product from '../models/product';

export default class User {
    _id: any;
    cart: any;
    email: string;
    username: string;

    constructor({ username, email, cart = { items: [], totalPrice: 0 }, _id = null }) {
        this.email = email;
        this.username = username
        this.cart = cart;
        this._id = _id ? new mongodb.ObjectId(_id) : null;
    }

    save() {
        const db = database.getDb();
        return db.collection('users').insertOne(this);
    }
    
    addToCart(product: Product) {
        const db = database.getDb();
        const productId = new mongodb.ObjectId(product._id);
        const cartProduct = this.cart.items.findIndex(cp => cp.productId.toString() === productId.toString());
        
        const updatedCartItems = [...this.cart.items];
        let totalPrice = this.cart.totalPrice;

        if (cartProduct === -1) {
            updatedCartItems.push({
                productId,
                quantity: 1
            });

        } else {
            updatedCartItems[cartProduct].quantity += 1;
        }

        totalPrice += +product.price;

        return db.collection('users').updateOne(
            {
                _id: this._id
            },
            {
                $set: {
                    cart: {
                        items: updatedCartItems,
                        totalPrice: totalPrice
                    }
                }
            }
        );
    }

    static findById(userId) {
        const db = database.getDb();
        const _id = new mongodb.ObjectId(userId);
        return db.collection('users').findOne({ _id });
    }
}

