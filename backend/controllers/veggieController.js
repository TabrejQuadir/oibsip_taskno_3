const asyncHandler = require('express-async-handler');
const { Veggies } = require('../models/Inventory'); // Assuming the model is exported as 'Veggies'

// Add a new Veggies or update an existing Veggies
const addVeggie = asyncHandler(async (req, res) => {
    const { name, quantity } = req.body;

    // Check if a Veggies with the same name exists
    let existingVeggies = await Veggies.findOne({ name });

    if (existingVeggies) {
        // If Veggies exists, update its quantity
        existingVeggies.quantity += quantity;
        const updatedVeggies = await existingVeggies.save();
        res.status(200).json(updatedVeggies);
    } else {
        // If Veggies does not exist, create a new Veggies
        const newVeggies = new Veggies({
            name,
            quantity
        });

        const savedVeggies = await newVeggies.save();
        res.status(201).json(savedVeggies);
    }
});

// Get all Veggiess
const getVeggies = asyncHandler(async (req, res) => {
    const Veggiess = await Veggies.find({});
    res.json(Veggiess);
});

module.exports = { addVeggie, getVeggies };
