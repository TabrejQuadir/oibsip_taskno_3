const express = require('express');
const router = express.Router();
const { addCheese, getCheeses } = require('../controllers/cheeseController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, admin, addCheese) 
    .get(protect, getCheeses); 

module.exports = router;
