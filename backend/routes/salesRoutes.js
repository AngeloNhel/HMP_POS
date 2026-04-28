const router = require("express").Router();
const sales = require("../controllers/salesController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/checkout", verifyToken, sales.createSale);
router.get("/customers", verifyToken, sales.getCustomers);

module.exports = router;