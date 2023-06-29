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

  return sales;
};

// console.log(findByIdSales(1).then((res) => console.log(res)));

module.exports = {
  findAllSales,
  findByIdSales,
};