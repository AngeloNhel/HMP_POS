const router = require("express").Router();
const product = require("../controllers/productController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.get("/", verifyToken, product.getProducts);
router.post("/", verifyToken, isAdmin, product.addProduct);
router.put("/:id", verifyToken, isAdmin, product.updateProduct);
router.delete("/:id", verifyToken, isAdmin, product.deleteProduct);
router.post("/:id/restock", verifyToken, isAdmin, product.restockProduct);

module.exports = router;