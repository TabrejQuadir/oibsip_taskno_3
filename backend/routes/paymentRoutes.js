const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/order', paymentController.createOrder);

module.exports = router;
