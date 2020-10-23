const fs = require('fs');
const path = require('path');
const pathUtil = require('../util/path')

const _path = path.join(pathUtil, 'data', 'products.json');

const readFile = (cb) => {
    fs.readFile(_path, (error, fileContent) => {
        if (error) {
            cb([]);
            return;
        }

        cb(JSON.parse(fileContent));
    });
}

module.exports = class Product {
    title: string;
    imageUrl: string;
    description: string;
    price: string;
    
    constructor({ title, imageUrl, description, price }) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        readFile(products => {
            products.push(this);

            fs.writeFile(_path, JSON.stringify(products), (_error) => {
                console.error(_error)
            });
        });
    }

    static fetchAll(cb) {
        readFile(cb)
    }

}