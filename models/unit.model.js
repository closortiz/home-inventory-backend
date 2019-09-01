const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const unitSchema = new Schema({
    identifier: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    size: { type: String },
    images: { type: Array },
    tags: { type: Array, required: true },
}, {
        timestamps: true
    }
);

const Unit = mongoose.model('Unit', unitSchema);

module.exports = Unit;