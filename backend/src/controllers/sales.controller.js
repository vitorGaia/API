const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAllSales = async (_req, res) => {
  const { status, data } = await salesService.findAllSales();
  res.status(mapStatusHTTP(status)).json(data);
};

const findByIdSales = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.findByIdSales(id);
  res.status(mapStatusHTTP(status)).json(data);
};

const insertSales = async (req, res) => {
  const { status, data } = await salesService.insertSales(req.body);
  res.status(mapStatusHTTP(status)).json(data);
};

const deleteSales = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.deleteSales(id);
  if (!data) return res.status(mapStatusHTTP(status)).send();
  res.status(mapStatusHTTP(status)).json(data);
};

const updateSales = async (req, res) => {
  const { saleId, productId } = req.params;
  const { status, data } = await salesService.updateSales(saleId, productId, req.body);
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  findAllSales,
  findByIdSales,
  insertSales,
  deleteSales,
  updateSales,
};