const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    identifier: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    size: { type: String },
    units: { type: Array },
    images: { type: Array },
    tags: { type: Array, required: true },
}, {
        timestamps: true
    }
);

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;