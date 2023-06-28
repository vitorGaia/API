const route = require('express').Router();
const { productsController } = require('../controllers');

route.get('/', productsController.findAllProducts);

route.get('/:id', productsController.findByIdProducts);

module.exports = route;