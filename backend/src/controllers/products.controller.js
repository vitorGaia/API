const { productsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAllProducts = async (_req, res) => {
  const { status, data } = await productsService.findAllProducts();
  res.status(mapStatusHTTP(status)).json(data);
};

const findByIdProducts = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.findByIdProducts(id);
  res.status(mapStatusHTTP(status)).json(data);
};

const insertProducts = async (req, res) => {
  const { body } = req;
  const { status, data } = await productsService.insertProducts(body);
  res.status(mapStatusHTTP(status)).json(data);
};

const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.updateProducts(req.body, +id);
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  findAllProducts,
  findByIdProducts,
  insertProducts,
  updateProducts,
};