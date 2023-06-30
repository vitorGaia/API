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

// console.log(insertSales(test).then((res) => console.log(res)));

module.exports = {
  findAllSales,
  findByIdSales,
  insertSales,
};