const { salesModel } = require('../models');

const findAllSales = async () => {
  const sales = await salesModel.findAllSales();
  return { status: 'SUCCESSFUL', data: sales };
};

const findByIdSales = async (saleID) => {
  const sales = await salesModel.findByIdSales(saleID);

  if (!sales) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

  return { status: 'SUCCESSFUL', data: sales };
};

module.exports = {
  findAllSales,
  findByIdSales,
};