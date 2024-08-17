const express = require('express');
const router = express.Router();
const { addVeggie, getVeggies } = require('../controllers/veggieController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, admin, addVeggie) 
    .get(protect, getVeggies); 

module.exports = router;
