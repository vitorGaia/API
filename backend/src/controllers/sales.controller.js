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

module.exports = {
  findAllSales,
  findByIdSales,
};