const express = require('express');
const app_router = express.Router();
const msgController = require('../controllers/msg');

// GET Home
app_router.get('/',msgController.index);

module.exports = app_router; 