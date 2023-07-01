const route = require('express').Router();
const { productsController } = require('../controllers');
const { validateProductName } = require('../middlewares');

route.get('/', productsController.findAllProducts);

route.get('/:id', productsController.findByIdProducts);

route.post('/', validateProductName, productsController.insertProducts);

route.put('/:id', validateProductName, productsController.updateProducts);

route.delete('/:id', productsController.deleteProducts);

module.exports = route;