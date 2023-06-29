const { productsModel } = require('../models');

const findAllProducts = async () => {
  const products = await productsModel.findAllProducts();
  return { status: 'SUCCESSFUL', data: products };
};

const findByIdProducts = async (productId) => {
  const product = await productsModel.findByIdProducts(productId);

  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  return { status: 'SUCCESSFUL', data: product };
};

const insertProducts = async (product) => {
  const newProduct = await productsModel.insertProducts(product);
  return { status: 'CREATED', data: newProduct };
};

module.exports = {
  findAllProducts,
  findByIdProducts,
  insertProducts,
};