const { productsModel } = require('../models');

const getIds = async () => {
  const products = await productsModel.findAllProducts();
  return products.map((product) => product.id);
};

const validateProductId = async (req, res, next) => {
  const ids = await getIds();
  const testProductId = req.body.some((sale) => !sale.productId);
  const testProductId2 = req.body.some((sale) => !(sale.productId in ids));

  if (testProductId) return res.status(400).json({ message: '"productId" is required' });

  if (testProductId2) return res.status(404).json({ message: 'Product not found' });

  next();
};

const validateQuantity = (req, res, next) => {
  const { body: [singleSale] } = req;
  const testQuantity = req.body.some((sale) => sale.quantity === undefined);
  const testQuantity2 = req.body.some((sale) => !sale.quantity <= 0);

  if (testQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (testQuantity2 || singleSale.quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = {
  validateQuantity,
  validateProductId,
};
