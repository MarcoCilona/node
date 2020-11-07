require('dotenv').config();
// import modules for creating a server and handle requests
// http launch a server, send requests
// http launch a SSL encoded server
const bodyParser = require('body-parser');
const errorController = require('./controllers/error')
const express = require('express');
const path = require('path');
// const http = require('http');
import database from './util/database';

import { router as adminRoutes } from './routes/admin';
import { router as shopRoutes } from './routes/shop';

const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Accepts array of handlers, executed for every incoming requests
// app.use(middleware);

// // Function used to start the server, RETURNS a server
// const server = http.createServer(app);

// // Starts a process the node uses to keep listening to incoming requests
// // By default uses localhost
// server.listen(3000);


database.mongoConnect((client) => {
    // This is a shortcut to create server and listen for calls
    app.listen(3000);
})