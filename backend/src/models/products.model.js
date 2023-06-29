const connection = require('./connection');
const getFormattedQuery = require('../utils/getFormattedQuery');

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

const insertProducts = async (product) => {
  const columns = getFormattedQuery.getFormattedColumnNames(product);
  const placeholders = getFormattedQuery.getFormattedPlaceholders(product);

  const query = `INSERT INTO products (${columns}) VALUE (${placeholders})`;

  const [{ insertId }] = await connection.execute(query, [...Object.values(product)]);
  
  return { id: insertId, ...product };
};

// console.log(insertProducts(test).then((res) => console.log(res)));

module.exports = {
  findAllProducts,
  findByIdProducts,
  insertProducts,
};