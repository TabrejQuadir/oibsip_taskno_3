const mongoose = require('mongoose');

// Assuming you have a User model
const User = require('./User');

const pizzaSchema = new mongoose.Schema({
    base: {
        type: String,
        required: true,
    },
    sauce: {
        type: String,
        required: true,
    },
    cheese: {
        type: String,
        required: true,
    },
    veggies: {
        type: [String],
        required: true,
    },
    meat: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Pending"
    },
    price: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;
