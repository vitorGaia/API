const route = require('express').Router();
const { salesController } = require('../controllers');

route.get('/', salesController.findAllSales);

route.get('/:id', salesController.findByIdSales);

route.post('/', salesController.insertSales);

module.exports = route;