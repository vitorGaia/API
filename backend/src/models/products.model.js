const connection = require('./connection');

const findAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const findByIdProducts = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
    );
  return product;
};

module.exports = {
  findAllProducts,
  findByIdProducts,
};