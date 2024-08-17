const express = require('express');
const router = express.Router();
const { addMeat, getMeats } = require('../controllers/meatController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, admin, addMeat) 
    .get(protect, getMeats); 

module.exports = router;
