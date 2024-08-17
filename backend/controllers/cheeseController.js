const asyncHandler = require('express-async-handler');
const { Cheese } = require('../models/Inventory'); // Assuming the model is exported as 'Cheese'

// Add a new Cheese or update an existing Cheese
const addCheese = asyncHandler(async (req, res) => {
    const { name, quantity } = req.body;

    let existingCheese = await Cheese.findOne({ name });

    if (existingCheese) {
        existingCheese.quantity += quantity;
        const updatedCheese = await existingCheese.save();
        res.status(200).json(updatedCheese);
    } else {
        const newCheese = new Cheese({
            name,
            quantity
        });

        const savedCheese = await newCheese.save();
        res.status(201).json(savedCheese);
    }
});

// Get all Cheeses
const getCheeses = asyncHandler(async (req, res) => {
    const Cheeses = await Cheese.find({});
    res.json(Cheeses);
});

module.exports = { addCheese, getCheeses };
