const asyncHandler = require('express-async-handler');
const { Meat } = require('../models/Inventory'); 

// Add a new Meat or update an existing Meat
const addMeat = asyncHandler(async (req, res) => {
    const { name, quantity } = req.body;

    let existingMeat = await Meat.findOne({ name});

    if (existingMeat) {
        existingMeat.quantity += quantity;
        const updatedMeat = await existingMeat.save();
        res.status(200).json(updatedMeat);
    } else {
        const newMeat = new Meat({
            name,
            quantity
        });

        const savedMeat = await newMeat.save();
        res.status(201).json(savedMeat);
    }
});

// Get all Meats
const getMeats = asyncHandler(async (req, res) => {
    const Meats = await Meat.find({});
    res.json(Meats);
});

module.exports = { addMeat, getMeats };
