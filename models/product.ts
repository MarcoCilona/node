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
    id: number;
    title: string;
    imageUrl: string;
    description: string;
    price: string;
    
    constructor({ id = null, title, imageUrl, description, price }) {
        this.id = id ? +id : null;
        this.title = title;
        this.imageUrl = imageUrl || "https://www.asme.org/getmedia/c2c8ea5a-b690-4ba7-92bb-34bd1432862b/book_guide_hero_books.png?width=300&height=315&ext=.png";
        this.description = description;
        this.price = price;
    }

    save() {
        readFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === +this.id)
                products[existingProductIndex] = this;
            } else {
                this.id = Math.random();
                products.push(this);
            }

            fs.writeFile(_path, JSON.stringify(products), (_error) => {
                console.error(_error)
            });
        });
    }

    static fetchAll(cb) {
        readFile(cb)
    }

    static findById(id, cb) {
        readFile(products => {
            const product = products.find(prod => prod.id === id);
            cb(product);
        })
    }
}