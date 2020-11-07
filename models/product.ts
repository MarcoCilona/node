const mongodb = require('mongodb');
import { ObjectId } from 'mongodb';
import database from '../util/database';

export default class Product {
    _id: ObjectId;
    title: string;
    imageUrl: string;
    description: string;
    price: string;
    userId: ObjectId;
    
    constructor({title, imageUrl, description, price, userId = null, id = null }) {
        this.title = title;
        this.imageUrl = imageUrl || "https://www.asme.org/getmedia/c2c8ea5a-b690-4ba7-92bb-34bd1432862b/book_guide_hero_books.png?width=300&height=315&ext=.png";
        this.description = description;
        this.price = price;
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId = userId ? new mongodb.ObjectId(userId) : null;
    }

    save() {
        const db = database.getDb();
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