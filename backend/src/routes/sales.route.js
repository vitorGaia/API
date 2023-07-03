const route = require('express').Router();
const { salesController } = require('../controllers');
const { validateInsertSales, validateUpdateSales } = require('../middlewares');

route.get('/', salesController.findAllSales);

route.get('/:id', salesController.findByIdSales);

route.post(
  '/',
  validateInsertSales.validateProductId,
  validateInsertSales.validateQuantity,
  salesController.insertSales,
);

route.delete('/:id', salesController.deleteSales);

route.put(
  '/:saleId/products/:productId/quantity',
  validateUpdateSales.validateQuantity,
  salesController.updateSales,
);

module.exports = route;