const Pizza = require('../models/Pizza');
const { Base, Sauce, Cheese, Veggies, Meat } = require('../models/Inventory');
const sendEmail = require("../utils/emailService")

const addPizza = async (req, res) => {
    try {
        const { base, sauce, cheese, veggies = [], meat, price } = req.body;

        // Validate required fields
        if (!base || !sauce || !cheese || !meat || !req.user || !price) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check availability of ingredients
        const [baseItem, sauceItem, cheeseItem, meatItem, veggieItems] = await Promise.all([
            Base.findOne({ name: base }),
            Sauce.findOne({ name: sauce }),
            Cheese.findOne({ name: cheese }),
            Meat.findOne({ name: meat }),
            Promise.all(veggies.map(veggie => Veggies.findOne({ name: veggie })))
        ]);

        if (!baseItem || !sauceItem || !cheeseItem || !meatItem || veggieItems.some(v => !v)) {
            return res.status(400).json({ error: 'One or more ingredients not found' });
        }

        if (baseItem.quantity <= 0 || sauceItem.quantity <= 0 || cheeseItem.quantity <= 0 || meatItem.quantity <= 0 || veggieItems.some(v => v.quantity <= 0)) {
            return res.status(400).json({ error: 'Insufficient ingredient quantities' });
        }

        // Decrement quantities and add pizza
        await Promise.all([
            Base.findOneAndUpdate({ name: base }, { $inc: { quantity: -1 } }),
            Sauce.findOneAndUpdate({ name: sauce }, { $inc: { quantity: -1 } }),
            Cheese.findOneAndUpdate({ name: cheese }, { $inc: { quantity: -1 } }),
            Meat.findOneAndUpdate({ name: meat }, { $inc: { quantity: -1 } }),
            Promise.all(veggies.map(veggie => 
                Veggies.findOneAndUpdate({ name: veggie }, { $inc: { quantity: -1 } })
            ))
        ]);

        // Check if base quantity is below the threshold
        const updatedBaseItem = await Base.findOne({ name: base });
        console.log(updatedBaseItem, "baseItem")
        if (updatedBaseItem.quantity < 20) {
            try {
                await sendEmail({
                    to: 'tabrezquadir6@gmail.com', 
                    subject: 'Low Pizza Base Quantity Alert',
                    text: `The quantity of the pizza base "${base}" is now ${updatedBaseItem.quantity}. Please restock.`,
                });
            } catch (error) {
                console.error('Error sending low base quantity alert:', error);
            }
        }

        // Create a new pizza instance
        const newPizza = new Pizza({
            base,
            sauce,
            cheese,
            veggies,
            meat,
            price,
            user: req.user._id, 
        });

        const savedPizza = await newPizza.save();
        res.status(201).json(savedPizza);
    } catch (error) {
        console.error('Error adding pizza:', error);
        res.status(500).json({ error: 'Failed to add pizza' });
    }
};

const getPizzasByUserId = async (req, res) => {
    try {
        const userId = req.user._id; // Access user ID from req.user

        console.log('User ID:', userId);

        // Validate userId
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Find pizzas by user ID
        const pizzas = await Pizza.find({ user: userId });

        if (pizzas.length === 0) {
            return res.status(404).json({ message: 'No pizzas found for this user' });
        }

        res.status(200).json(pizzas);
    } catch (error) {
        console.error('Error fetching pizzas:', error);
        res.status(500).json({ error: 'Failed to retrieve pizzas' });
    }
};

const getAllPizza = async (req, res) => {
    try {
        const orderedPizzas = await Pizza.find();
        res.status(200).json(orderedPizzas);
    } catch (error) {
        console.error('Error fetching pizzas:', error);
        res.status(500).json({ error: 'Failed to retrieve pizzas' });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // Directly destructure `status`

        // Valid statuses
        const validStatuses = ['Pending', 'Sent to delivery'];

        // Validate status
        if (!validStatuses.includes(status)) {
            console.error(`Invalid status: ${status}`); // Log the invalid status
            return res.status(400).json({ error: 'Invalid status' });
        }

        // Update order status
        const updatedOrder = await Pizza.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating order status:', error.message);
        res.status(500).json({ error: 'Failed to update order status' });
    }
};

module.exports = {
    addPizza,
    getPizzasByUserId,
    getAllPizza,
    updateOrderStatus
};
