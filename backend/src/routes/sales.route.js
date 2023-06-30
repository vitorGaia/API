const route = require('express').Router();
const { salesController } = require('../controllers');
const { validateInsertSales } = require('../middlewares');

route.get('/', salesController.findAllSales);

route.get('/:id', salesController.findByIdSales);

route.post(
  '/',
  validateInsertSales.validateProductId,
  validateInsertSales.validateQuantity,
  salesController.insertSales,
);

module.exports = route;