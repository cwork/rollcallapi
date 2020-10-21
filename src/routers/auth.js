const express = require('express');
const { protect } = require('../middleware/auth');
const { login, logout, me } = require('../controllers/auth');

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, me);

module.exports = router;
