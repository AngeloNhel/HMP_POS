const db = require("../config/db");

// GET PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD PRODUCT (USED BY AddItemModal)
exports.addProduct = async (req, res) => {
  try {
    const {
      code,
      name,
      description,
      base_price,
      item_unit,
      supplier,
      price,
      stock,
      critical_stocks,
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO products 
      (code, name, description, base_price, item_unit, supplier, price, stock, critical_stocks)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        code,
        name,
        description,
        base_price,
        item_unit,
        supplier,
        price,
        stock,
        critical_stocks,
      ]
    );

    const productId = result.insertId;

    // STOCK HISTORY
    if (stock > 0) {
      await db.query(
        `INSERT INTO stock_history (product_id, stock_change, movement_type, created_at)
         VALUES (?, ?, 'ADJUSTMENT', NOW())`,
        [productId, stock]
      );
    }

    // AUDIT
    await db.query(
      `INSERT INTO audit_logs (action, description, user_id, created_at)
       VALUES ('CREATE_PRODUCT', ?, ?, NOW())`,
      [`Added ${name} (${code}) qty ${stock}`, req.user.id]
    );

    res.json({ message: "Product added" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    await db.query(
      `UPDATE products SET 
        code=?, name=?, description=?, base_price=?, item_unit=?, supplier=?, 
        price=?, stock=?, critical_stocks=? 
       WHERE id=?`,
      [...Object.values(req.body), req.params.id]
    );

    res.json({ message: "Product updated" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    await db.query("DELETE FROM products WHERE id = ?", [req.params.id]);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// RESTOCK
exports.restockProduct = async (req, res) => {
  const { quantity } = req.body;

  try {
    await db.query(
      "UPDATE products SET stock = stock + ? WHERE id = ?",
      [quantity, req.params.id]
    );

    await db.query(
      `INSERT INTO stock_history (product_id, stock_change, movement_type, created_at)
       VALUES (?, ?, 'RESTOCK', NOW())`,
      [req.params.id, quantity]
    );

    res.json({ message: "Restocked" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};