const express = require('express');
const router = express.Router();
const { addBase, getBases } = require('../controllers/baseController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, admin, addBase) // Ensure only authorized admin can add base
    .get(protect, getBases); // Protect the route to get all bases

module.exports = router;
