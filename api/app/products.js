const path = require('path');
const fs = require("fs").promises;
const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const config = require('../config');
const Product = require("../models/Product");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
    try {
        const query = {};

        if (req.query.category) {
            query.category = req.query.category;
        }
        const products = await Product
            .find(query)
            .populate("user", "displayName phoneNumber")
            .populate('category', 'title');

        return res.send(products);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).send({message: 'Not found'});
        }

        return res.send(product);
    } catch (e) {
        next(e);
    }
});

router.post('/', auth, upload.single('image'), async (req, res, next) => {
    try {
        if (!!req.body.category || !req.body.title || !req.body.price || !req.body.description || !req.file.filename) {
            return res.status(400).send({message: 'All fields are required'});
        }

        const productData = {
            category: req.body.category,
            user: req.user._id,
            title: req.body.title,
            price: parseFloat(req.body.price),
            description: req.body.description,
            image: req.file.filename,
        };

        const product = new Product(productData);

        await product.save();

        return res.send(product);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            if (req.file) {
                await fs.unlink(req.file.path);
            }
            return res.status(400).send(e);
        }
        next(e);
    }
});

router.delete('/:id', auth, async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (req.user && (req.user._id === product.user._id)) {
            return res.send({message: 'OK!'});
        } else {
            return res.status(403).send({message: 'you have not logged in!'});
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;