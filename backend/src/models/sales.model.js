const connection = require('./connection');

const findAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT
      sp.sale_id AS saleId,
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM sales_products AS sp
    INNER JOIN sales AS s
    ON sp.sale_id = s.id`,
  );

  return sales;
};

const findByIdSales = async (saleId) => {
  const [sales] = await connection.execute(
    `SELECT
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM sales_products AS sp
    INNER JOIN sales AS s
      ON sp.sale_id = s.id
    WHERE s.id = ?;`,
    [saleId],
  );

  if (sales.length !== 0) return sales;
};

const insertSales = async (sales) => {
  const [{ insertId }] = await connection.execute(
    `INSERT INTO sales (date)
    VALUES (CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo'))`,
  );
  
  let query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES';
  
  sales.forEach(({ productId, quantity }, index) => {
    query += `('${insertId}', '${productId}', '${quantity}')`;
    
    if (index !== sales.length - 1) {
      query += ', ';
    }
  });
  
  await connection.execute(query);

  const formatReturn = {
    id: insertId,
    itemsSold: sales,
  };
  
  return formatReturn;
};

const deleteSales = async (id) => {
  const [sales] = await connection.execute(
    `SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity
    FROM sales_products AS sp
    INNER JOIN sales AS s ON sp.sale_id = s.id`,
  );
  const ids = sales.map(({ saleId }) => saleId);
  
  if (!ids.includes(+id)) return undefined;

  await connection.execute(
    `DELETE FROM sales
    WHERE id = ?`,
    [id],
  );

  await connection.execute(
    `DELETE FROM sales_products
    WHERE sale_id = ?`,
    [id],
  );

  return 'DELETED';
};

const query = `
SELECT sp.sale_id AS saleId, sp.product_id AS productId, sp.quantity, s.date
FROM sales_products sp
JOIN sales s ON sp.sale_id = s.id
WHERE sp.sale_id = ? AND sp.product_id = ?`;

const updateSales = async (saleId, productId, { quantity }) => {
  const [sales] = await connection.execute(
    `SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity
    FROM sales_products AS sp INNER JOIN sales AS s ON sp.sale_id = s.id`,
  );

  const saleIds = sales.map((sale) => sale.saleId);
  const productIds = sales.map((product) => product.productId);
  
  if (!saleIds.includes(+saleId)) return 'Sale not found';
  if (!productIds.includes(+productId)) return 'Product not found in sale';

  await connection.execute(
    `UPDATE sales_products SET quantity = ?
    WHERE sale_id = ? AND product_id = ?`,
    [quantity, saleId, productId],
  );

  const [result] = await connection.execute(query, [saleId, productId]);

  return result;
};

module.exports = {
  findAllSales,
  findByIdSales,
  insertSales,
  deleteSales,
  updateSales,
};