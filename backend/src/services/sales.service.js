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

const insertSales = async (sales) => {
  const salesResponse = await salesModel.insertSales(sales);
  return { status: 'CREATED', data: salesResponse };
};

const deleteSales = async (id) => {
  const response = await salesModel.deleteSales(id);

  if (response !== 'DELETED') {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  return { status: response };
};

module.exports = {
  findAllSales,
  findByIdSales,
  insertSales,
  deleteSales,
};