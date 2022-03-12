const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const products = require('./app/products');
const categories = require('./app/categories');
const users = require('./app/users');
const config = require('./config');
const app = express();

const port = 8000;

app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());
app.use(express.static('public'));
app.use('/products', products);
app.use('/categories', categories);
app.use('/users', users);

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(e => console.error(e));