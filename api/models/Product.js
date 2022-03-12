const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                if (value) return true;
                if (value <= 0) return false
            },
            message: 'Price should not be last then zero'
        }
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;