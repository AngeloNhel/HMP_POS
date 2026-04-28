const db = require("../config/db");

exports.getSaleItems = async (req, res) => {
  const [rows] = await db.query(`
    SELECT si.*, p.name 
    FROM sale_items si
    JOIN products p ON si.product_id = p.id
  `);

  res.json(rows);
};

exports.getSaleItemsBySale = async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM sale_items WHERE sale_id = ?",
    [req.params.saleId]
  );

  res.json(rows);
};