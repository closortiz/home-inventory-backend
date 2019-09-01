const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    identifier: { type: String, required: true, unique: true, trim: true, minlength: 10 },
    identifier_type: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    brand: { type: String },
    dimension: { type: String },
    weight: { type: String },
    lowest_price: { type: Number },
    highest_price: { type: Number },
    images: { type: Array },
    tags: { type: Array, required: true },
    quantity: { type: Number, required: true }
}, {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;