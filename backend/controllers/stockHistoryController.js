const db = require("../config/db");

exports.getStockHistory = async (req, res) => {
  const [rows] = await db.query(`
    SELECT sh.*, p.name 
    FROM stock_history sh
    JOIN products p ON sh.product_id = p.id
    ORDER BY sh.created_at DESC
  `);

  res.json(rows);
};

exports.getStockHistoryByProduct = async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM stock_history WHERE product_id = ?",
    [req.params.productId]
  );

  res.json(rows);
};