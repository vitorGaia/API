const findAllProductsResponseOk = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const findByIdProductsResponseOk = {
  id: 2,
  name: 'Traje de encolhimento',
};
const findByIdProductsResponseError = {
  message: 'Product not found',
};

module.exports = {
  findAllProductsResponseOk,
  findByIdProductsResponseOk,
  findByIdProductsResponseError,
};