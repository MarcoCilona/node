const mongodb = require('mongodb');
import { ObjectId } from 'mongodb';
import database from '../util/database';

export default class User {
    email: string;
    username: string;

    constructor({ username, email, id }) {
        this.email = email;
        this.username = username
    }

    save() {
        const db = database.getDb();
        return db.collection('users').insertOne(this);
    }
    
    static findById(userId) {
        const db = database.getDb();
        const _id = new mongodb.ObjectId(userId);
        return db.collection('users').findOne({ _id });
    }
}

