const router = require("express").Router();
const supplier = require("../controllers/supplierController");
const { verifyToken } = require("../middleware/authMiddleware");

// GET
router.get("/", verifyToken, supplier.getSuppliers);

// ADD
router.post("/", verifyToken, supplier.addSupplier);

module.exports = router;