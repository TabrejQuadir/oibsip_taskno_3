const asyncHandler = require('express-async-handler');
const { Sauce } = require('../models/Inventory'); // Assuming the model is exported as 'Sauce'

// Add a new Sauce or update an existing Sauce
const addSauce = asyncHandler(async (req, res) => {
    const { name, quantity } = req.body;

    // Check if a Sauce with the same name exists
    let existingSauce = await Sauce.findOne({ name });

    if (existingSauce) {
        // If Sauce exists, update its quantity
        existingSauce.quantity += quantity;
        const updatedSauce = await existingSauce.save();
        res.status(200).json(updatedSauce);
    } else {
        // If Sauce does not exist, create a new Sauce
        const newSauce = new Sauce({
            name,
            quantity
        });

        const savedSauce = await newSauce.save();
        res.status(201).json(savedSauce);
    }
});

// Get all Sauces
const getSauces = asyncHandler(async (req, res) => {
    const sauces = await Sauce.find({});
    res.json(sauces);
});

module.exports = { addSauce, getSauces };
