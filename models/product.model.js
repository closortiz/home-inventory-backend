const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true, },
    product_identifier: {type: String, required: true, unique: true, trim: true, minlength:10},
    identifier_type:{type:String,required: true}
}, {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;