const express = require('express');
const api_router = express.Router();

const msgAPIController = require('../controllers/msg-api');

api_router.route('/msgs')
.get(msgAPIController.getAllMessagesOrderedByLastPosted)
.post(msgAPIController.addNewMessage);

module.exports = api_router;