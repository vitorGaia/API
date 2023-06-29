const route = require('express').Router();
const { productsController } = require('../controllers');

route.get('/', productsController.findAllProducts);

route.get('/:id', productsController.findByIdProducts);

route.post('/', productsController.insertProducts);

module.exports = route;