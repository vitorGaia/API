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

const updateProducts = async (product, id) => {
  const response = await productsModel.updateProducts(product, id);

  if (!response) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  return { status: 'SUCCESSFUL', data: response };
};

const deleteProducts = async (id) => {
  const response = await productsModel.deleteProducts(id);

  if (response !== 'DELETED') {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  return { status: response };
};

const findByNameProducts = async (productName) => {
  const response = await productsModel.findByNameProducts(productName);

  return { status: 'SUCCESSFUL', data: response };
};

module.exports = {
  findAllProducts,
  findByIdProducts,
  insertProducts,
  updateProducts,
  deleteProducts,
  findByNameProducts,
};