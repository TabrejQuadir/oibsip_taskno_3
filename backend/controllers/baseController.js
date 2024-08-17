const asyncHandler = require('express-async-handler');
const {Base} = require('../models/Inventory');

// Add a new base or update an existing base
const addBase = asyncHandler(async (req, res) => {
    const { name, quantity, price } = req.body;

    let base = await Base.findOne({ name });

    if (base) {
        base.quantity += quantity;
        const updatedBase = await base.save();
        res.status(200).json(updatedBase);
    } else {
        const newBase = new Base({
            name,
            quantity,
            price
        });

        const savedBase = await newBase.save();
        res.status(201).json(savedBase);
    }
});

// Get all bases
const getBases = asyncHandler(async (req, res) => {
    const bases = await Base.find({});
    res.json(bases);
});

module.exports = { addBase, getBases };
