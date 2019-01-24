const express = require('express');
const router = express.Router();
const msgController = require('../controllers/msg');

// GET Home
router.get('/',msgController.index);

module.exports = router; 