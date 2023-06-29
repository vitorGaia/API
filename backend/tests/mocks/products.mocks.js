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

const findAllProductsResponseOkNormalized = [
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
    name: 'Escudo do Capitão América',
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
  findAllProductsResponseOkNormalized,
  findByIdProductsResponseOk,
  findByIdProductsResponseError,
};