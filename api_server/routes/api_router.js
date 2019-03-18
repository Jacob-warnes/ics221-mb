const express = require('express');
const api_router = express.Router();

const msgAPIController = require('../controllers/msg-api');
const userAPIController = require('../controllers/user-api');

api_router.route('/msgs')
.get(msgAPIController.getAllMessagesOrderedByLastPosted)
.post(msgAPIController.addNewMessage);

//Is this right?
api_router.post('/users', userAPIController.registerNewUser);
api_router.get('/users/login', userAPIController.loginUser);

module.exports = api_router;