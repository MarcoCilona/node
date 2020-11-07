const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
    MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.bccly.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, { useUnifiedTopology: true })
    .then(client => {
        console.info('Connected');
        _db = client.db();
        cb();
    })
    .catch(err => console.error(err))
}


const getDb = () => {
    if (_db)
    return _db;
    
    console.error('No db found');
}

export default {
    mongoConnect,
    getDb
}