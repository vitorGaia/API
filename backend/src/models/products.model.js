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

const updateProducts = async ({ name }, id) => {
  const [products] = await connection.query('SELECT * FROM products');
  const ids = products.map((product) => product.id);

  if (!(id in ids)) return undefined;
  
  await connection.execute(
    `UPDATE products
    SET name = ?
    WHERE id = ?;`,
    [name, id],
  );

  return { id, name };
};

const deleteProducts = async (id) => {
  const [products] = await connection.query('SELECT * FROM products');
  const ids = products.map((product) => product.id);

  if (!ids.includes(+id)) return undefined;

  await connection.execute(
    `DELETE FROM products
    WHERE id = ?`,
    [id],
  );

  return 'DELETED';
};

// console.log(updateProducts(test, 2).then((res) => console.log(res)));

module.exports = {
  findAllProducts,
  findByIdProducts,
  insertProducts,
  updateProducts,
  deleteProducts,
};