const mongoose = require('mongoose');

// Base Schema
const baseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    // category: { type: String } Optional: for further categorization
});

const Base = mongoose.model('Base', baseSchema);

// Cheese Schema
const cheeseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    // category: { type: String }  Optional: for further categorization
});

const Cheese = mongoose.model('Cheese', cheeseSchema);

// Veggies Schema
const veggiesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    // category: { type: String } /Optional: for further categorization
});

const Veggies = mongoose.model('Veggies', veggiesSchema);

// Sauce Schema
const sauceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    // category: { type: String }  Optional: for further categorization
});

const Sauce = mongoose.model('Sauce', sauceSchema);

// Meat Schema
const meatSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    // category: { type: String }  Optional: for further categorization
});

const Meat = mongoose.model('Meat', meatSchema);

module.exports = { Base, Cheese, Veggies, Sauce, Meat };
