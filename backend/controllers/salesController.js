const db = require("../config/db");

// CHECKOUT
exports.createSale = async (req, res) => {
  const {
    receipt_no,
    cart,
    subtotal,
    discount_percent,
    discount_amount,
    total_amount,
    tendered,
    change_amount,
    customer_name,
    user_id
  } = req.body;

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const [sale] = await conn.query(
      `INSERT INTO sales 
      (receipt_no, user_id, subtotal, total_amount, created_at, discount_percent, discount_amount, tendered, change_amount, customer_name, status)
      VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, 'completed')`,
      [
        receipt_no,
        user_id,
        subtotal,
        total_amount,
        discount_percent,
        discount_amount,
        tendered,
        change_amount,
        customer_name || "Walk-in"
      ]
    );

    for (const item of cart) {
      await conn.query(
        `INSERT INTO sale_items 
        (sale_id, product_id, quantity, unit, subtotal, product_name, price)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          sale.insertId,
          item.id,
          item.qty,
          item.unit || "pcs",
          item.price * item.qty,
          item.name,
          item.price
        ]
      );

      await conn.query(
        "UPDATE products SET stock = stock - ? WHERE id = ?",
        [item.qty, item.id]
      );

      await conn.query(
        `INSERT INTO stock_history (product_id, stock_change, movement_type, created_at)
         VALUES (?, ?, 'SALE', NOW())`,
        [item.id, -item.qty]
      );
    }

    await conn.query(
      `INSERT INTO audit_logs (action, description, user_id, created_at)
       VALUES ('SALE', ?, ?, NOW())`,
      [`Sale ${receipt_no}`, user_id]
    );

    await conn.commit();

    res.json({ receipt_no });

  } catch (err) {
    await conn.rollback();
    res.status(500).json({ message: err.message });
  } finally {
    conn.release();
  }
};

// CUSTOMERS (for dropdown)
exports.getCustomers = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT DISTINCT customer_name 
      FROM sales 
      WHERE customer_name IS NOT NULL AND customer_name != ''
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};