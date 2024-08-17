// routes/pizzaRoutes.js
const express = require('express');
const router = express.Router();
const { addPizza, getPizzasByUserId, getAllPizza, updateOrderStatus } = require('../controllers/pizzaController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/add')
    .post(protect, addPizza);
    
router.route('/getPizzasByUserId')
    .get(protect, getPizzasByUserId);

router.route('/getAllPizza')
    .get(protect, getAllPizza);

    router.route('/updateStatus/:id')
    .put(protect, admin, updateOrderStatus); 

module.exports = router;
