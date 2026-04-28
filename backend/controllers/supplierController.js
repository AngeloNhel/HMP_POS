const db = require("../config/db");

// ✅ GET ALL SUPPLIERS
exports.getSuppliers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM suppliers");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ ADD SUPPLIER
exports.addSupplier = async (req, res) => {
  try {
    const { supplier_name, contact, address } = req.body;

    // 🔥 basic validation
    if (!supplier_name) {
      return res.status(400).json({ message: "Supplier name is required" });
    }

    await db.query(
      `INSERT INTO suppliers (supplier_name, contact, address)
       VALUES (?, ?, ?)`,
      [supplier_name, contact, address]
    );

    res.json({ message: "Supplier added successfully" });

  } catch (err) {
    console.log("ADD SUPPLIER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};