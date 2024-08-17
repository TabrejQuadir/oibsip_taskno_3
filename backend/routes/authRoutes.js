const express = require('express');
const router = express.Router();
const { registerUser, authUser, forgotPassword, resetPassword, getUserProfile, getAuthStatus } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(registerUser);
router.post('/login', authUser);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);
router.get('/profile', protect, getUserProfile);
router.get('/status', protect, getAuthStatus);

module.exports = router;
