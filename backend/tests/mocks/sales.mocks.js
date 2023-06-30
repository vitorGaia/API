const findAllSalesResponseOk = [
  {
    saleId: 1,
    date: '2023-06-29T01:52:19.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-06-29T01:52:19.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-06-29T01:52:19.000Z',
    productId: 3,
    quantity: 15,
  },
];

const findByIdSalesResponseOk = [
  {
    date: '2023-06-29T16:19:58.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    date: '2023-06-29T16:19:58.000Z',
    productId: 2,
    quantity: 10,
  },
];

const insertSalesResponseOk = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 27,
    },
    {
      productId: 2,
      quantity: 27,
    },
  ],
};

module.exports = {
  findAllSalesResponseOk,
  findByIdSalesResponseOk,
  insertSalesResponseOk,
};