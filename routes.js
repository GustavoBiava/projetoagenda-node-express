const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contactController = require('./src/controllers/contactController');

route.get('/', homeController.homepage);
route.post('/', homeController.receivePost);

route.get('/contact', contactController.homepage);

module.exports = route;