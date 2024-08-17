const express = require('express');
const router = express.Router();
const { addSauce, getSauces } = require('../controllers/sauceController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, admin, addSauce) 
    .get(protect, getSauces); 

module.exports = router;
