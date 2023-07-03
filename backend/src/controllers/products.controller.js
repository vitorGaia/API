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

const deleteProducts = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.deleteProducts(id);
  if (!data) return res.status(mapStatusHTTP(status)).send();
  res.status(mapStatusHTTP(status)).json(data);
};

const findByNameProducts = async (req, res) => {
  const { q } = req.query;
  const { status, data } = await productsService.findByNameProducts(q);
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  findAllProducts,
  findByIdProducts,
  insertProducts,
  updateProducts,
  deleteProducts,
  findByNameProducts,
};