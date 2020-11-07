const mongodb = require('mongodb');
import { ObjectId } from 'mongodb';
import database from '../util/database';

class Product {
    _id: ObjectId;
    title: string;
    imageUrl: string;
    description: string;
    price: string;
    
    constructor({title, imageUrl, description, price, id = null }) {
        this.title = title;
        this.imageUrl = imageUrl || "https://www.asme.org/getmedia/c2c8ea5a-b690-4ba7-92bb-34bd1432862b/book_guide_hero_books.png?width=300&height=315&ext=.png";
        this.description = description;
        this.price = price;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    save() {
        const db = database.getDb();
        console.log(this._id)
        if (this._id) {
            return db.collection('products').updateOne({ _id: this._id }, { $set: this });
        }

        return db.collection('products').insertOne(this);
    }
    
    static deleteById(id) {
        const db = database.getDb();
        return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(id) });
    }

    static fetchAll() {
        const db = database.getDb();
        return db.collection('products').find().toArray();
    }

    static findById(id) {
        const db = database.getDb();
        return db.collection('products').find({ _id: new mongodb.ObjectId(id) }).next();
    }

}

module.exports = Product;

// const fs = require('fs');
// const path = require('path');
// const pathUtil = require('../util/path')

// const _path = path.join(pathUtil, 'data', 'products.json');

// const readFile = (cb) => {
//     fs.readFile(_path, (error, fileContent) => {
//         if (error) {
//             cb([]);
//             return;
//         }

//         cb(JSON.parse(fileContent));
//     });
// }

// const Cart = require('./cart');

// module.exports = class Product {
//     id: number;
//     title: string;
//     imageUrl: string;
//     description: string;
//     price: string;
    
//     constructor({ id = null, title, imageUrl, description, price }) {
//         this.id = id ? +id : null;
//         this.title = title;
//         this.imageUrl = imageUrl || "https://www.asme.org/getmedia/c2c8ea5a-b690-4ba7-92bb-34bd1432862b/book_guide_hero_books.png?width=300&height=315&ext=.png";
//         this.description = description;
//         this.price = price;
//     }

//     save() {
//         readFile(products => {
//             if (this.id) {
//                 const existingProductIndex = products.findIndex(prod => prod.id === +this.id)
//                 products[existingProductIndex] = this;
//             } else {
//                 this.id = Math.random();
//                 products.push(this);
//             }

//             fs.writeFile(_path, JSON.stringify(products), (_error) => {
//                 console.error(_error)
//             });
//         });
//     }

//     static deleteById(id) {
//         readFile(products => {
//             const product = products.find(prod => prod.id === +id);
//             const updatedProducts = products.filter(prod => prod.id !== +id);
//             fs.writeFile(_path, JSON.stringify(updatedProducts), err => {
//                 console.error(err);
//                 if(!err) {
//                     Cart.deleteProduct(id, product.price)
//                 }
//             })
//         })
//     }

//     static fetchAll(cb) {
//         readFile(cb)
//     }

//     static findById(id, cb) {
//         readFile(products => {
//             const product = products.find(prod => prod.id === id);
//             cb(product);
//         })
//     }
// }